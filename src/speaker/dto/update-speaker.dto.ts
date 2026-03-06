import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';
import { createSpeakerSchema } from './create-speaker.dto';

export const updateSpeakerSchema = createSpeakerSchema.partial();

export class UpdateSpeakerDto extends ZodClass(updateSpeakerSchema) {}
