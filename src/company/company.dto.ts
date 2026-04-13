import { PAGE_SIZE_COUNT } from 'src/common/constants';
import { ZodClass } from 'src/common/utils/zod-to-class.util';
import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1).max(100),
  acronym: z.string().max(20).optional(),
  address: z.string().min(1),
});

export const updateCompanySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  acronym: z.string().max(20).optional(),
  address: z.string().min(1).optional(),
});

export const filterCompanySchema = z.object({
  search: z.string().min(1).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(PAGE_SIZE_COUNT).optional(),
});

export class CreateCompanyDto extends ZodClass(createCompanySchema) {}

export class CompanyDTO extends ZodClass(createCompanySchema) {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CompaniesDTO extends CompanyDTO {
  employedCount: number;
  formerEmployeeCount: number;
}

export class UpdateCompanyDto extends ZodClass(updateCompanySchema) {}

export class FilterCompanyDto extends ZodClass(filterCompanySchema) {}
