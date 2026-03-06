import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createMinistrySchema = z.object({
  name: z.string().min(1).max(100),
  parentMinistry: z.number().int().positive().optional().nullable(),
  mission: z.string().optional().nullable(),
  vision: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const updateMinistrySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  parentMinistry: z.number().int().positive().optional().nullable(),
  mission: z.string().optional().nullable(),
  vision: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export class CreateMinistryDto extends ZodClass(createMinistrySchema) {}

export class MinistryDTO extends ZodClass(updateMinistrySchema) {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateMinistryDto extends ZodClass(updateMinistrySchema) {}
