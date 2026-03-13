import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const ministryRoleColumnSchema = z.enum([
  'id',
  'ministryId',
  'roleName',
]);

export const ministryRoleItemSchema = z.object({
  ministryId: z.number().int().positive(),
  roleName: z.string().min(1).max(100),
});

export const createMinistryRolesSchema = z.object({
  ministryRoles: z.array(ministryRoleItemSchema).min(1),
});

export const updateMinistryRoleSchema = z.object({
  ministryId: z.number().int().positive().optional(),
  roleName: z.string().min(1).max(100).optional(),
});

export const filterMinistryRoleSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  ministryId: z.coerce.number().int().positive().optional(),
  roleName: z.string().min(1).max(100).optional(),
  roleNameContains: z.string().min(1).max(100).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(100).optional(),
  orderBy: ministryRoleColumnSchema.optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  columns: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
      }

      if (Array.isArray(value)) {
        return value;
      }

      return undefined;
    }, z.array(ministryRoleColumnSchema).min(1).optional())
    .optional(),
});

export class MinistryRoleItemDto extends ZodClass(ministryRoleItemSchema) {}

export class CreateMinistryRolesDto extends ZodClass(
  createMinistryRolesSchema,
) {}

export class UpdateMinistryRoleDto extends ZodClass(updateMinistryRoleSchema) {}

export class FilterMinistryRoleDto extends ZodClass(filterMinistryRoleSchema) {}
