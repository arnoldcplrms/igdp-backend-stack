import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const employmentItemSchema = z.object({
  companyId: z.number().int(),
  position: z.string().max(100),
  startDate: z.preprocess((arg) => new Date(arg as string), z.date()),
  endDate: z
    .preprocess((arg) => new Date(arg as string), z.date())
    .optional()
    .nullable(),
});

export const createEmploymentSchema = z.object({
  accountId: z.number().int(),
  employments: z.array(employmentItemSchema).nonempty(),
});

export const createEmploymentTxSchema = z.object({
  id: z.number().int().optional(),
  companyId: z.number().int(),
  course: z.string().max(150).optional().nullable(),
  startDate: z.preprocess((arg) => new Date(arg as string), z.date()),
  endDate: z
    .preprocess((arg) => new Date(arg as string), z.date())
    .optional()
    .nullable(),
});

export const updateEmploymentSchema = z
  .object()
  .extend(employmentItemSchema.shape)
  .partial();

export class CreateEmploymentDto extends ZodClass(createEmploymentSchema) {}

export class CreateUserEmploymentDto extends ZodClass(employmentItemSchema) {}

export class UpdateEmploymentDto extends ZodClass(
  employmentItemSchema.partial(),
) {}

export class EmploymentDTO extends ZodClass(employmentItemSchema) {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}
