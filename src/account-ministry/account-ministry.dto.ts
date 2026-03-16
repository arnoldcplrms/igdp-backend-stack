import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { PAGE_SIZE_COUNT } from 'src/common/constants';
import { z } from 'zod';

export const accountMinistryColumnSchema = z.enum([
  'id',
  'accountId',
  'ministryId',
  'ministryRoleId',
  'isPrimary',
  'createdAt',
  'updatedAt',
]);

export const createAccountMinistrySchema = z.object({
  accountId: z.number().int().positive(),
  ministryId: z.number().int().positive(),
  ministryRoleId: z.number().int().positive(),
  isPrimary: z.boolean().optional(),
  description: z.string().max(1000).optional().nullable(),
});

export const updateAccountMinistrySchema = z.object({
  accountId: z.number().int().positive().optional(),
  ministryId: z.number().int().positive().optional(),
  ministryRoleId: z.number().int().positive().optional(),
  isPrimary: z.boolean().optional(),
  description: z.string().max(1000).optional().nullable(),
});

export const filterAccountMinistrySchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  accountId: z.coerce.number().int().positive().optional(),
  ministryId: z.coerce.number().int().positive().optional(),
  ministryRoleId: z.coerce.number().int().positive().optional(),
  isPrimary: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        if (value === 'true') return true;
        if (value === 'false') return false;
      }

      return value;
    }, z.boolean().optional())
    .optional(),
  descriptionContains: z.string().min(1).max(1000).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(PAGE_SIZE_COUNT).optional(),
  orderBy: accountMinistryColumnSchema.optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export class CreateAccountMinistryDto extends ZodClass(
  createAccountMinistrySchema,
) {}

export class UpdateAccountMinistryDto extends ZodClass(
  updateAccountMinistrySchema,
) {}

export class FilterAccountMinistryDto extends ZodClass(
  filterAccountMinistrySchema,
) {}
