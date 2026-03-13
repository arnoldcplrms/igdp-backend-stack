import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';
import {
  CreateAccountMinistryDto,
  FilterAccountMinistryDto,
  UpdateAccountMinistryDto,
  createAccountMinistrySchema,
  filterAccountMinistrySchema,
  updateAccountMinistrySchema,
} from './account-ministry.dto';
import { AccountMinistryService } from './account-ministry.service';

@Controller('account-ministries')
export class AccountMinistryController {
  constructor(
    private readonly accountMinistryService: AccountMinistryService,
  ) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createAccountMinistrySchema))
    createAccountMinistryDto: CreateAccountMinistryDto,
  ) {
    return this.accountMinistryService.create(createAccountMinistryDto);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(filterAccountMinistrySchema))
    filters: FilterAccountMinistryDto,
  ) {
    return this.accountMinistryService.findAll(filters);
  }

  @Get('account/:accountId')
  findByAccountId(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.accountMinistryService.findByAccountId(accountId);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.accountMinistryService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateAccountMinistrySchema))
    updateAccountMinistryDto: UpdateAccountMinistryDto,
  ) {
    return this.accountMinistryService.update(id, updateAccountMinistryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountMinistryService.remove(id);
  }
}
