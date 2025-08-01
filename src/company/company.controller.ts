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
  findByName(@Query('name') name: string) {
    return this.companyService.findByName(name);
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
}
