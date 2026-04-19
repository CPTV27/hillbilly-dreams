// packages/modules/commerce/src/orders.ts
// One-off Order creation + lifecycle.

import { prisma } from '@bigmuddy/database';
import { send as emailSend, templates as emailTemplates } from '@bigmuddy/email';
import type { Brand as EmailBrand } from '@bigmuddy/email';
import type { Order, CreateOrderInput, OrderStatus, TenantId } from './types';

const VALID_EMAIL_BRANDS: EmailBrand[] = [
  'inn',
  'magazine',
  'touring',
  'records',
  'radio',
  'cpp',
  'tuthill',
  'studio-c',
  'dsd',
  'mbt',
];

/**
 * Resolve the correct email-brand for outbound customer mail.
 *
 * Prefers the brand carried on the order's line items (every Product has
 * a `brand`), since a `big-muddy` tenant sells across multiple brands
 * (`inn`, `magazine`, `touring`, `records`, `radio`, `cpp`). Falls back
 * to mapping the tenantId 1:1 when no item brand is available, and
 * finally to `mbt` as a neutral sender.
 *
 * Gemini review (LOW): previously hardcoded `big-muddy → inn`, which
 * meant a Records merch purchase sent an Inn-branded receipt.
 */
function emailBrandFor(
  tenantId: string,
  itemBrand?: string
): EmailBrand {
  if (itemBrand && VALID_EMAIL_BRANDS.includes(itemBrand as EmailBrand)) {
    return itemBrand as EmailBrand;
  }
  if (VALID_EMAIL_BRANDS.includes(tenantId as EmailBrand)) {
    return tenantId as EmailBrand;
  }
  if (tenantId === 'big-muddy') return 'inn'; // legacy fallback
  return 'mbt';
}

export async function list(opts?: {
  tenantId?: TenantId;
  status?: OrderStatus;
  customerEmail?: string;
}): Promise<Order[]> {
  return prisma.order.findMany({
    where: {
      ...(opts?.tenantId ? { tenantId: opts.tenantId } : {}),
      ...(opts?.status ? { status: opts.status } : {}),
      ...(opts?.customerEmail ? { customerEmail: opts.customerEmail } : {}),
    },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Fetch an order by id.
 *
 * Pass `tenantId` whenever `id` comes from untrusted input (API URL params,
 * request bodies). Returns `null` for orders owned by a different tenant,
 * closing the IDOR vector where a guessed order id would expose another
 * tenant's customer data.
 */
export async function get(
  id: string,
  tenantId?: TenantId
): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
  if (!order) return null;
  if (tenantId && order.tenantId !== tenantId) return null;
  return order;
}

/**
 * Create a draft order. Locks in price-at-purchase from the Product table.
 * Does NOT decrement inventory (that happens at fulfillment).
 */
export async function create(input: CreateOrderInput): Promise<Order> {
  // Resolve every product upfront in one query; capture priceCents at order time.
  const productIds = input.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  let subtotalCents = 0;
  const itemRows: Array<{
    productId: string;
    quantity: number;
    priceCents: number;
    totalCents: number;
  }> = [];

  for (const item of input.items) {
    const p = productMap.get(item.productId);
    if (!p) throw new Error(`Product not found: ${item.productId}`);
    const lineTotal = p.priceCents * item.quantity;
    subtotalCents += lineTotal;
    itemRows.push({
      productId: p.id,
      quantity: item.quantity,
      priceCents: p.priceCents,
      totalCents: lineTotal,
    });
  }

  // Tax + shipping calculations are deferred to checkout step.
  const totalCents = subtotalCents;

  return prisma.order.create({
    data: {
      tenantId: input.tenantId,
      customerEmail: input.customerEmail,
      customerName: input.customerName ?? null,
      clientId: input.clientId ?? null,
      status: 'pending',
      subtotalCents,
      taxCents: 0,
      shippingCents: 0,
      totalCents,
      shippingAddress: input.shippingAddress as never,
      metadata: input.metadata as never,
      items: { create: itemRows },
    },
    include: { items: { include: { product: true } } },
  });
}

/** Mark order as paid. Triggered by Stripe webhook on checkout.session.completed. */
export async function markPaid(
  id: string,
  patch: { stripeCheckoutId?: string; stripePaymentIntentId?: string }
): Promise<Order> {
  return prisma.order.update({
    where: { id },
    data: {
      status: 'paid',
      ...(patch.stripeCheckoutId && { stripeCheckoutId: patch.stripeCheckoutId }),
      ...(patch.stripePaymentIntentId && {
        stripePaymentIntentId: patch.stripePaymentIntentId,
      }),
    },
  });
}

/** Mark order as fulfilled. Decrements inventory for each item. */
export async function markFulfilled(id: string): Promise<Order> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) throw new Error(`Order not found: ${id}`);
  if (order.status !== 'paid') {
    throw new Error(`Cannot fulfill order in status ${order.status}; must be paid`);
  }

  // Decrement inventory in a transaction with the status update so we don't
  // half-fulfill.
  return prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });
      if (product?.trackInventory && product.inventoryLevel !== null) {
        await tx.product.update({
          where: { id: item.productId },
          data: { inventoryLevel: { decrement: item.quantity } },
        });
      }
    }
    return tx.order.update({
      where: { id },
      data: { status: 'fulfilled', fulfilledAt: new Date() },
    });
  });
}

export async function markShipped(
  id: string,
  trackingNumber: string
): Promise<Order> {
  const updated = await prisma.order.update({
    where: { id },
    data: { status: 'shipped', shippedAt: new Date(), trackingNumber },
    include: { items: { include: { product: true } } },
  });

  // Shipping notification — use first item's brand for cross-brand tenants
  const firstItemBrand = (
    updated as typeof updated & {
      items?: Array<{ product?: { brand?: string } }>;
    }
  ).items?.[0]?.product?.brand;
  const brand = emailBrandFor(updated.tenantId, firstItemBrand);
  void emailSend.sendSafe({
    brand,
    to: updated.customerEmail,
    email: emailTemplates.orderShipped({
      customerName: updated.customerName ?? undefined,
      customerEmail: updated.customerEmail,
      brand,
      orderId: updated.id,
      items: [],
      totalCents: updated.totalCents,
      currency: updated.currency,
      trackingNumber,
    }),
    tags: { event: 'order.shipped', orderId: updated.id },
  });

  return updated;
}

export async function refund(id: string, notes?: string): Promise<Order> {
  const updated = await prisma.order.update({
    where: { id },
    data: { status: 'refunded', notes: notes ?? null },
    include: { items: { include: { product: true } } },
  });

  // Refund notification — use first item's brand for cross-brand tenants
  const firstItemBrand = (
    updated as typeof updated & {
      items?: Array<{ product?: { brand?: string } }>;
    }
  ).items?.[0]?.product?.brand;
  const brand = emailBrandFor(updated.tenantId, firstItemBrand);
  void emailSend.sendSafe({
    brand,
    to: updated.customerEmail,
    email: emailTemplates.orderRefunded({
      customerName: updated.customerName ?? undefined,
      customerEmail: updated.customerEmail,
      brand,
      orderId: updated.id,
      items: [],
      totalCents: updated.totalCents,
      currency: updated.currency,
    }),
    tags: { event: 'order.refunded', orderId: updated.id },
  });

  return updated;
}
