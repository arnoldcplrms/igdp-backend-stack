import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';
import { Gender, UserType } from '@prisma/client';

export const createAccountSchema = z.object({
  id: z.number().int().optional(),
  firstName: z.string().min(1).max(50),
  middleName: z.string().min(1).max(50).optional().nullable(),
  lastName: z.string().min(1).max(50),
  facebookLink: z.string().max(255).optional().nullable(),
  contactNumber: z.string().max(20),
  email: z.email().min(1).max(100),
  gender: z.enum(Gender),
  birthDate: z.coerce.date(),
  userType: z.enum(UserType),
  schoolId: z.number().int().optional().nullable(),
  dGroupLeaderId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  emergencyContactName: z.string().max(100).optional().nullable(),
  emergencyContactNumber: z.string().max(20).optional().nullable(),
});

export const updateAccountSchema = z
  .object()
  .extend(createAccountSchema.shape)
  .partial();

export class CreateAccountDto extends ZodClass(createAccountSchema) {}

export class AccountDTO {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  birthDate: Date;
  dGroupLeader?: any;
  dGroupMembers?: number;
}

export class AccountQueryDto extends AccountDTO {
  _count: {
    dGroupMembers: number;
  };
}

export class UpdateAccountDto extends ZodClass(updateAccountSchema) {}
