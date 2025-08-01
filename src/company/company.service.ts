import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private companyRepo: CompanyRepository) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepo.createCompany(createCompanyDto);
  }

  findByName(name?: string) {
    return this.companyRepo.findCompanyByName(name);
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
