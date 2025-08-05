import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  CreateAccountDto,
  createAccountSchema,
  UpdateAccountDto,
  updateAccountSchema,
} from './account.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createAccountSchema))
    createAccountDto: CreateAccountDto,
  ) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
  ) {
    return this.accountService.findAll(
      parseInt(page),
      parseInt(pageSize),
      sort,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAccountSchema))
    updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
