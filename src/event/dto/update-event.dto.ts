import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';
import { createEventSchema } from './create-event.dto';

export const updateEventSchema = createEventSchema.partial();

export class UpdateEventDto extends ZodClass(updateEventSchema) {}
