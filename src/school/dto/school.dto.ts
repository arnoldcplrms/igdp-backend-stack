import { z } from 'zod';

export const createSchoolSchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1),
});

export const updateSchoolSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  address: z.string().min(1).optional(),
});

export interface CreateSchoolDto extends z.infer<typeof createSchoolSchema> {}

export interface SchoolDTO {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateSchoolDto extends z.infer<typeof updateSchoolSchema> {}
