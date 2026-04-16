import { Gender, LifeStage } from '@prisma/client';
import { PAGE_SIZE_COUNT } from 'src/common/constants';
import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createDGroupSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  dleaders: z
    .array(z.number().int().positive())
    .min(1, 'At least one leader is required'),
  dmembers: z.array(z.number().int().positive()).optional().default([]),
  churchId: z.number().int().positive(),
});

export const updateDGroupSchema = z.object({
  name: z.string().min(1).max(100).optional(),
});

export const filterDGroupSchema = z.object({
  search: z.string().min(1).max(100).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(PAGE_SIZE_COUNT).optional(),
});

export class CreateDGroupDto extends ZodClass(createDGroupSchema) {}

export class UpdateDGroupDto extends ZodClass(updateDGroupSchema) {}

export class FilterDGroupDto extends ZodClass(filterDGroupSchema) {}

export class DGroupDTO {
  id: number;
  name: string;
  members: number;
  leaders: {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    gender: Gender;
  }[];
  lifestage: LifeStage[];
}
