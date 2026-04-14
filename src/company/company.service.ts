import { Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  FilterCompanyDto,
  UpdateCompanyDto,
} from './company.dto';
import { CompanyRepository } from './company.repository';
import { AccountDTO } from 'src/account/account.dto';

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

  async findById(id: number) {
    return this.companyRepo.findCompanyById(id);
  }

  findEmployeesInCompany(
    companyId: number,
    filters: FilterCompanyDto,
  ): Promise<Partial<AccountDTO>[]> {
    return this.companyRepo.findEmployeesByCompanyId(companyId, filters);
  }

  findFormerInCompany(
    companyId: number,
    filters: FilterCompanyDto,
  ): Promise<Partial<AccountDTO>[]> {
    return this.companyRepo.findFormerByCompanyId(companyId, filters);
  }
}
