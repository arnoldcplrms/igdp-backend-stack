import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createSpeakerSchema = z.object({
  name: z.string().min(1).max(100),
  accountId: z.number().int().optional(),
  updatedBy: z.number().int().optional(),
});

export class CreateSpeakerDto extends ZodClass(createSpeakerSchema) {}
