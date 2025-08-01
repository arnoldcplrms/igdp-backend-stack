import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createSchoolSchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1),
});

export const updateSchoolSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  address: z.string().min(1).optional(),
});

export class CreateSchoolDto extends ZodClass(createSchoolSchema) {}

export class SchoolDTO {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateSchoolDto extends ZodClass(updateSchoolSchema) {}
