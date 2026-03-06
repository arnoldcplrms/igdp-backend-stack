import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createEmploymentSchema = z.object({
  id: z.number().int().optional(),
  companyId: z.number().int(),
  accountId: z.number().int().optional().nullable(),
  position: z.string().max(100).optional(),
  startDate: z.preprocess((arg) => new Date(arg as string), z.date()),
  endDate: z
    .preprocess((arg) => new Date(arg as string), z.date())
    .optional()
    .nullable(),
});

export const updateEmploymentSchema = createEmploymentSchema.partial();

export class CreateEmploymentDto extends ZodClass(createEmploymentSchema) {}

export class UpdateEmploymentDto extends ZodClass(updateEmploymentSchema) {}
