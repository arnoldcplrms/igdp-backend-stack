import { GradeYear } from '@prisma/client';
import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createEducationSchema = z.object({
  schoolId: z.number().int(),
  accountId: z.number().int(),
  gradeYear: z.enum(GradeYear),
  course: z.string().max(150).optional().nullable(),
  startDate: z.preprocess((arg) => new Date(arg as string), z.date()),
  endDate: z
    .preprocess((arg) => new Date(arg as string), z.date())
    .optional()
    .nullable(),
});

export const updateAccountEducationSchema = z
  .object()
  .extend(createEducationSchema.shape)
  .partial();

export class CreateEducationDto extends ZodClass(createEducationSchema) {
  startDate: Date;
  endDate: Date | null;
}

export class UpdateEducationDto extends ZodClass(
  createEducationSchema.partial(),
) {}

export class EducationDTO extends ZodClass(createEducationSchema) {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}
