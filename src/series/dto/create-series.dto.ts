import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createSeriesSchema = z.object({
  name: z.string().min(1).max(100),
  ministryId: z.number().int().optional(),
});

export class CreateSeriesDto extends ZodClass(createSeriesSchema) {}
