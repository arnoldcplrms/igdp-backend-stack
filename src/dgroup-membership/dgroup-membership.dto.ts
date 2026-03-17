import { PAGE_SIZE_COUNT } from 'src/common/constants';
import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const DGroupMembershipRoleEnum = z.enum(['Member', 'Leader']);

export const dGroupMembershipItemSchema = z.object({
  dGroupId: z.number().int().positive(),
  accountId: z.number().int().positive(),
  role: DGroupMembershipRoleEnum,
});

export const createDGroupMembershipSchema = z.object({
  memberships: z.array(dGroupMembershipItemSchema).min(1),
});

export const filterDGroupMembershipSchema = z.object({
  dGroupId: z.coerce.number().int().positive().optional(),
  accountId: z.coerce.number().int().positive().optional(),
  role: DGroupMembershipRoleEnum.optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(PAGE_SIZE_COUNT).optional(),
});

export class DGroupMembershipItemDto extends ZodClass(
  dGroupMembershipItemSchema,
) {}

export class CreateDGroupMembershipDto extends ZodClass(
  createDGroupMembershipSchema,
) {}

export class FilterDGroupMembershipDto extends ZodClass(
  filterDGroupMembershipSchema,
) {}
