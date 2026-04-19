// packages/modules/email/src/types.ts

export type Brand =
  | 'inn'
  | 'magazine'
  | 'touring'
  | 'records'
  | 'radio'
  | 'cpp'
  | 'tuthill'
  | 'studio-c'
  | 'dsd'
  | 'mbt';

export interface SendResult {
  id: string;
  from: string;
  to: string;
  at: string;
}

export interface Email {
  subject: string;
  text: string;
  html?: string;
}

/** Common substitutions available in every template. */
export interface TemplateContext {
  customerName?: string;
  customerEmail: string;
  brand: Brand;
  /** Base URL for account links — defaults to env.NEXT_PUBLIC_BASE_URL */
  baseUrl?: string;
}

export interface SubscriptionContext extends TemplateContext {
  planName: string;
  priceCents: number;
  currency: string;
  interval: string;
  currentPeriodEnd?: string; // ISO
  trialEndsAt?: string;
  stripeCustomerId?: string;
}

export interface OrderContext extends TemplateContext {
  orderId: string;
  items: Array<{ name: string; quantity: number }>;
  totalCents: number;
  currency: string;
  trackingNumber?: string;
}

export interface QuoteContext extends TemplateContext {
  eventType: string;
  proposedDate?: string;
  quoteCents?: number;
}

export interface PreArrivalContext extends TemplateContext {
  checkInDate: string;
  roomType?: string;
  upcomingShow?: { name: string; date: string };
}
