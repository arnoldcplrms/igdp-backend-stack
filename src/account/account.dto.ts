import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';
import { Gender, UserType } from '@prisma/client';
import {
  createEducationTxSchema,
  CreateUserWithEducationDto,
} from 'src/education/education.dto';
import {
  CreateEmploymentDto,
  createEmploymentSchema,
} from 'src/employment/employment.dto';
import { PAGE_SIZE_COUNT } from 'src/common/constants';

export const createAccountSchema = z.object({
  basicInfo: z.object({
    id: z.number().int().optional(),
    firstName: z.string().min(1).max(50),
    middleName: z.string().min(1).max(50).optional().nullable(),
    lastName: z.string().min(1).max(50),
    nickname: z.string().max(50).optional().nullable(),
    profilePicture: z.string().max(255).optional().nullable(),
    facebookLink: z.string().max(255).optional().nullable(),
    contactNumber: z.string().max(20).optional().nullable(),
    email: z.string().email().min(1).max(100),
    gender: z.enum(Gender),
    birthDate: z.coerce.date(),
    userType: z.enum(UserType),
    emergencyContactName: z.string().max(100).optional().nullable(),
    emergencyContactNumber: z.string().max(20).optional().nullable(),
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
    nickname: z.string().max(50).optional().nullable(),
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
  education?: CreateUserWithEducationDto[];
  employment?: CreateEmploymentDto[];
}

export class AccountDTO {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  nickname?: string | null;
  birthDate: Date;
  profilePicture?: string | null;
  gender: string;
  age: number;
  email: string;
  isActive: boolean;
  dGroupLeader?: { id: number; firstName: string; lastName: string } | null; // Single leader
}

export type EventDTO = {
  id: number;
  eventDate: Date; // or Date type
};

export class AccountQueryDto {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  nickname?: string | null;
  birthDate: Date;
  email: string;
  gender: string;
  profilePicture?: string | null;
  dGroupLeader?: { id: number; firstName: string; lastName: string } | null;
  attendances?: Array<{
    eventId: number;
    createdAt: Date;
  }>;
}

export class AttendanceDetailDto {
  eventId: number;
  accountId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AccountDetailDto {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  birthDate: Date;
  profilePicture?: string | null;
  gender: string;
  email: string;
  contactNumber: string;
  userType: string;
  createdAt: Date;
  updatedAt: Date;
  emergencyContactName?: string | null;
  emergencyContactNumber?: string | null;
  dGroupLeader?: {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string | null;
  } | null;
  dGroupMembers?: { id: number; firstName: string; lastName: string }[];
  education?: Array<{
    schoolId?: number;
    startDate: Date;
    endDate?: Date | null;
    educationLevel: string;
    course?: string | null;
    school: {
      id: number;
      name: string;
      address: string;
    };
  }>;
  employment?: Array<{
    position?: string | null;
    startDate: Date;
    endDate?: Date | null;
    company: {
      id: number;
      name: string;
      address: string;
    };
  }>;
  latestAttendance?: Date | null;
  spouse?: {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string | null;
  } | null;
}

export class UpdateAccountDto extends ZodClass(updateAccountSchema) {}

export const fetchDGroupLeadersSchema = z.object({
  exemptedAccountId: z.number().int(),
  gender: z.enum(Gender),
});

export class FetchDGroupLeadersDto extends ZodClass(fetchDGroupLeadersSchema) {}

export const filterAccountSchema = z.object({
  search: z.string().min(1).optional(),
  sortOrder: z.string().min(1).optional(),
  sortBy: z.string().min(1).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(PAGE_SIZE_COUNT).optional(),
});

export class FilterAccountDto extends ZodClass(filterAccountSchema) {}
