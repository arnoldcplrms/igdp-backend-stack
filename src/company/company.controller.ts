import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  createCompanySchema,
  FilterCompanyDto,
  filterCompanySchema,
  updateCompanySchema,
  type CreateCompanyDto,
  type UpdateCompanyDto,
} from './company.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createCompanySchema))
    createCompanyDto: CreateCompanyDto,
  ) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findMany(
    @Query(new ZodValidationPipe(filterCompanySchema))
    filters: FilterCompanyDto,
  ) {
    return this.companyService.findMany(filters);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCompanySchema))
    updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.companyService.findById(+id);
  }

  @Get('/employed/:id')
  findEmployedInCompany(
    @Param('id') id: string,
    @Query(new ZodValidationPipe(filterCompanySchema))
    filters: FilterCompanyDto,
  ) {
    return this.companyService.findEmployeesInCompany(+id, filters);
  }

  @Get('/former/:id')
  findFormerInCompany(
    @Param('id') id: string,
    @Query(new ZodValidationPipe(filterCompanySchema))
    filters: FilterCompanyDto,
  ) {
    return this.companyService.findFormerInCompany(+id, filters);
  }
}
