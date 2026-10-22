import { z } from 'zod';

export const objectIdSchema = z.coerce.number().int().positive();

export const brokerSchema = z.object({
  BrokerName: z.string().trim().min(2).max(150),
  LicenseNumber: z.string().trim().min(2).max(80),
  Email: z.string().trim().email().max(254),
  Phone: z.string().trim().max(30).optional().or(z.literal('')),
  Status: z.enum(['Active', 'Inactive', 'Suspended']).default('Active'),
});

export const employeeSchema = z.object({
  BrokerID: objectIdSchema,
  FirstName: z.string().trim().min(1).max(80),
  LastName: z.string().trim().min(1).max(80),
  Email: z.string().trim().email().max(254),
  DateOfBirth: z.string().optional().or(z.literal('')),
  EmploymentStatus: z.enum(['Active', 'Inactive', 'OnLeave']).default('Active'),
});

export const providerSchema = z.object({
  ProviderName: z.string().trim().min(2).max(150),
  ProviderType: z.string().trim().min(2).max(50),
  ContactEmail: z.string().trim().email().max(254).optional().or(z.literal('')),
  Phone: z.string().trim().max(30).optional().or(z.literal('')),
  Status: z.enum(['Active', 'Inactive']).default('Active'),
});

export const policySchema = z.object({
  ProviderID: objectIdSchema,
  PolicyName: z.string().trim().min(2).max(150),
  PolicyType: z.string().trim().min(2).max(50),
  PremiumAmount: z.number().nonnegative(),
  CoverageAmount: z.number().nonnegative(),
  CurrencyCode: z.string().trim().length(3).default('INR'),
  Status: z.enum(['Active', 'Inactive', 'Withdrawn']).default('Active'),
});

export const enrollmentSchema = z.object({
  EmployeeID: objectIdSchema,
  PolicyID: objectIdSchema,
  BrokerID: objectIdSchema,
  EffectiveDate: z.string().optional().or(z.literal('')),
  EndDate: z.string().optional().or(z.literal('')),
  Status: z.enum(['Pending', 'Active', 'Rejected', 'Cancelled', 'Expired']).default('Pending'),
});

export function parseOptionalDate(value: string | null | undefined) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed;
}
