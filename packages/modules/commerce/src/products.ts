// packages/modules/commerce/src/products.ts
// One-off Product CRUD — merch, prints, books.

import { prisma } from '@bigmuddy/database';
import type {
  Product,
  CreateProductInput,
  TenantId,
  BrandId,
} from './types';

export async function list(opts?: {
  tenantId?: TenantId;
  brand?: BrandId;
  includeInactive?: boolean;
}): Promise<Product[]> {
  return prisma.product.findMany({
    where: {
      ...(opts?.tenantId ? { tenantId: opts.tenantId } : {}),
      ...(opts?.brand ? { brand: opts.brand } : {}),
      ...(opts?.includeInactive ? {} : { active: true }),
    },
    orderBy: [{ tenantId: 'asc' }, { name: 'asc' }],
  });
}

export async function get(id: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } });
}

export async function getBySlug(
  tenantId: TenantId,
  slug: string
): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { tenantId_slug: { tenantId, slug } },
  });
}

export async function create(input: CreateProductInput): Promise<Product> {
  return prisma.product.create({
    data: {
      tenantId: input.tenantId,
      brand: input.brand,
      slug: input.slug,
      name: input.name,
      description: input.description,
      priceCents: input.priceCents,
      currency: input.currency ?? 'usd',
      inventoryLevel: input.inventoryLevel ?? null,
      trackInventory: input.trackInventory ?? false,
      weight: input.weight ?? null,
      shippable: input.shippable ?? false,
      taxable: input.taxable ?? true,
      imageUrls: input.imageUrls ?? [],
      metadata: input.metadata as never,
      platformFeePercent:
        input.platformFeePercent !== undefined
          ? input.platformFeePercent
          : null,
    },
  });
}

export async function update(
  id: string,
  patch: Partial<CreateProductInput> & { active?: boolean }
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: {
      ...(patch.name !== undefined && { name: patch.name }),
      ...(patch.description !== undefined && { description: patch.description }),
      ...(patch.priceCents !== undefined && { priceCents: patch.priceCents }),
      ...(patch.inventoryLevel !== undefined && {
        inventoryLevel: patch.inventoryLevel,
      }),
      ...(patch.trackInventory !== undefined && {
        trackInventory: patch.trackInventory,
      }),
      ...(patch.imageUrls !== undefined && { imageUrls: patch.imageUrls }),
      ...(patch.metadata !== undefined && { metadata: patch.metadata as never }),
      ...(patch.active !== undefined && { active: patch.active }),
    },
  });
}

/**
 * Decrement inventory level by qty. Returns null if product is not
 * inventory-tracked or if the decrement would push below zero.
 */
export async function decrementInventory(
  id: string,
  qty: number
): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return null;
  if (!product.trackInventory) return product; // no-op for non-tracked
  if (product.inventoryLevel === null) return product;
  if (product.inventoryLevel - qty < 0) return null;
  return prisma.product.update({
    where: { id },
    data: { inventoryLevel: { decrement: qty } },
  });
}
