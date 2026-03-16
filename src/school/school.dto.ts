import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { PAGE_SIZE_COUNT } from 'src/common/constants';
import { z } from 'zod';

export const createSchoolSchema = z.object({
  name: z.string().min(1).max(100),
  acronym: z.string().min(1).max(20).optional().nullable(),
  address: z.string().min(1),
});

export const updateSchoolSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  acronym: z.string().min(1).max(20).optional().nullable(),
  address: z.string().min(1).optional(),
});

export const filterSchoolSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  acronym: z.string().min(1).max(20).optional(),
  address: z.string().min(1).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(PAGE_SIZE_COUNT).optional(),
});

export class CreateSchoolDto extends ZodClass(createSchoolSchema) {}

export class SchoolDTO {
  id: number;
  name: string;
  acronym?: string | null;
  address: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class UpdateSchoolDto extends ZodClass(updateSchoolSchema) {}

export class FilterSchoolDto extends ZodClass(filterSchoolSchema) {}
