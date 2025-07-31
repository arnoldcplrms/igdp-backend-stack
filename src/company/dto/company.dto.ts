import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1),
});

export const updateCompanySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  address: z.string().min(1).optional(),
});

export interface CreateCompanyDto extends z.infer<typeof createCompanySchema> {}

export interface CompanyDTO {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateCompanyDto extends z.infer<typeof updateCompanySchema> {}
