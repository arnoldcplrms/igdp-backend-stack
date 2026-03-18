import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const eventMinistryItemSchema = z.object({
  eventId: z.number().int().positive(),
  ministryId: z.number().int().positive(),
  isPrimaryOrganizer: z.boolean().optional().nullable(),
});

export const createEventMinistriesSchema = z.object({
  eventMinistries: z.array(eventMinistryItemSchema),
});

export const updateEventMinistrySchema = z.object({
  isPrimaryOrganizer: z.boolean().optional().nullable(),
});

export class EventMinistryItemDto extends ZodClass(eventMinistryItemSchema) {}

export class CreateEventMinistriesDto extends ZodClass(
  createEventMinistriesSchema,
) {}

export class UpdateEventMinistryDto extends ZodClass(
  updateEventMinistrySchema,
) {}
