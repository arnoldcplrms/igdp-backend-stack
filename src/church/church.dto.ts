import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createChurchSchema = z.object({
  name: z.string().min(1).max(150),
  address: z.string().min(1),
});

export const updateChurchSchema = z.object({
  name: z.string().min(1).max(150).optional(),
  address: z.string().min(1).optional(),
});

export class CreateChurchDto extends ZodClass(createChurchSchema) {}

export class ChurchDto extends ZodClass(updateChurchSchema) {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateChurchDto extends ZodClass(updateChurchSchema) {}

export type ChurchResponseDTO = {
  id: number;
  name: string;
  address: string;
};
