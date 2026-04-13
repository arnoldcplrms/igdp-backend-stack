import { Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  FilterCompanyDto,
  UpdateCompanyDto,
} from './company.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private companyRepo: CompanyRepository) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepo.createCompany(createCompanyDto);
  }

  findByName(name?: string, skip?: number, take?: number) {
    return this.companyRepo.findCompanyByName(name, skip, take);
  }

  async findMany(filters: FilterCompanyDto) {
    return this.companyRepo.findCompanies(filters);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepo.updateCompany(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companyRepo.removeCompany(id);
  }

  findById(id: number) {
    return this.companyRepo.findCompanyById(id);
  }
}
