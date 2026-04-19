// packages/modules/finance/src/types.ts
import type {
  ModuleEngagement as PrismaModuleEngagement,
  ModuleLicenseProfile as PrismaModuleLicenseProfile,
  RetainerHour as PrismaRetainerHour,
} from '@prisma/client';

export type ModuleEngagement = PrismaModuleEngagement;
export type ModuleLicenseProfile = PrismaModuleLicenseProfile;
export type RetainerHour = PrismaRetainerHour;

export type EntityId =
  | 'mbt'
  | 'big-muddy-natchez'
  | 'big-muddy-touring'
  | 'tuthill-design';

export type EngagementStatus = 'active' | 'paused' | 'ended';

export interface CreateEngagementInput {
  vendorTenantId: string;
  customerEmail: string;
  subscriptionId?: string;
  modules: string[];
  monthlyRevenueCents: number;
  platformFeePercent: number;
  notes?: string;
}

export interface LogBucketHoursInput {
  bucketMonth: string; // "2026-04"
  consumingEntityId: EntityId | string;
  hoursWorked: number;
  hourlyRateCents?: number;
  workedBy?: string;
  workType?: string;
  workedDate: Date;
  projectRef?: string;
  notes?: string;
  invoiceRef?: string;
}

export interface PnLLine {
  category: string;
  amountCents: number;
}

export interface EntityPnL {
  entity: string;
  periodStart: Date;
  periodEnd: Date;
  revenue: PnLLine[];
  costs: PnLLine[];
  totalRevenueCents: number;
  totalCostsCents: number;
  netCents: number;
}
