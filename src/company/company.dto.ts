import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1),
});

export const updateCompanySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  address: z.string().min(1).optional(),
});

export class CreateCompanyDto extends ZodClass(createCompanySchema) {}

export class CompanyDTO {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateCompanyDto extends ZodClass(updateCompanySchema) {}
