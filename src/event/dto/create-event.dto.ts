import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createEventSchema = z.object({
  eventName: z.string().min(1).max(100),
  eventDate: z.string().datetime(),
  location: z.string().max(100),
  seriesId: z.number().int().optional(),
  ministryId: z.number().int().optional(),
});

export class CreateEventDto extends ZodClass(createEventSchema) {}
