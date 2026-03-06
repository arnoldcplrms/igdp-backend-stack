import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const eventSpeakerItemSchema = z.object({
  speakerId: z.number().int(),
  eventId: z.number().int(),
});

export const createEventSpeakersSchema = z.object({
  eventSpeakers: z.array(eventSpeakerItemSchema),
});

export class EventSpeakerItemDto extends ZodClass(eventSpeakerItemSchema) {}

export class CreateEventSpeakersDto extends ZodClass(
  createEventSpeakersSchema,
) {}
