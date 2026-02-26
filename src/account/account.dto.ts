import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';
import { Gender, UserType } from '@prisma/client';
import {
  CreateEducationDto,
  createEducationSchema,
  createEducationTxSchema,
} from 'src/education/education.dto';
import {
  CreateEmploymentDto,
  createEmploymentSchema,
} from 'src/employment/employment.dto';

export const createAccountSchema = z.object({
  basicInfo: z.object({
    id: z.number().int().optional(),
    firstName: z.string().min(1).max(50),
    middleName: z.string().min(1).max(50).optional().nullable(),
    lastName: z.string().min(1).max(50),
    nickName: z.string().max(50).optional().nullable(),
    profilePicture: z.string().max(255).optional().nullable(),
    facebookLink: z.string().max(255).optional().nullable(),
    contactNumber: z.string().max(20),
    email: z.string().email().min(1).max(100),
    gender: z.enum(Gender),
    birthDate: z.coerce.date(),
    userType: z.enum(UserType),
    emergencyContactName: z.string().max(100).optional().nullable(),
    emergencyContactNumber: z.string().max(20).optional().nullable(),
    dGroupLeaderId: z.number().int().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional().nullable(),
  }),
  education: z.array(createEducationTxSchema).optional().nullable(),
  employment: z.array(createEmploymentSchema).optional().nullable(),
});

export const updateAccountSchema = z
  .object({
    firstName: z.string().min(1).max(50).optional(),
    middleName: z.string().min(1).max(50).optional().nullable(),
    lastName: z.string().min(1).max(50).optional(),
    nickName: z.string().max(50).optional().nullable(),
    profilePicture: z.string().max(255).optional().nullable(),
    facebookLink: z.string().max(255).optional().nullable(),
    contactNumber: z.string().max(20).optional(),
    email: z.string().email().min(1).max(100).optional(),
    gender: z.enum(Gender).optional(),
    birthDate: z.coerce.date().optional(),
    userType: z.enum(UserType).optional(),
    emergencyContactName: z.string().max(100).optional().nullable(),
    emergencyContactNumber: z.string().max(20).optional().nullable(),
    dGroupLeaderId: z.number().int().optional().nullable(),
  })
  .partial();

export class CreateAccountDto extends ZodClass(createAccountSchema) {
  education?: CreateEducationDto[];
  employment?: CreateEmploymentDto[];
}

export class AccountDTO {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  birthDate: Date;
  profilePicture?: string | null;
  gender: string;
  age: number;
  dGroupLeader?: { id: number; firstName: string; lastName: string } | null; // Single leader
  dGroupMembers?: { id: number; firstName: string; lastName: string }[]; // Array of members
}

export class AccountQueryDto {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  birthDate: Date;
  gender: string;
  profilePicture?: string | null;
  dGroupLeader?: { id: number; firstName: string; lastName: string } | null;
  dGroupMembers?: { id: number; firstName: string; lastName: string }[];
}

export class UpdateAccountDto extends ZodClass(updateAccountSchema) {}
