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
  FetchDGroupLeadersDto,
  fetchDGroupLeadersSchema,
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

  @Get('all')
  findSorted(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sortOrder') sort: 'asc' | 'desc' = 'asc',
    @Query('sortBy') sortBy: string = 'lastName',
    @Query('name') name?: string,
  ) {
    return this.accountService.findSorted(
      parseInt(page),
      parseInt(pageSize),
      sort,
      sortBy,
      name,
    );
  }

  @Get('search-by-name')
  findByName(@Query('name') name: string) {
    return this.accountService.findByName(name);
  }

  @Post('dgroup-leaders')
  fetchDGroupLeaders(
    @Body(new ZodValidationPipe(fetchDGroupLeadersSchema))
    fetchDGroupLeadersDto: FetchDGroupLeadersDto,
  ) {
    return this.accountService.fetchDGroupLeaders(
      fetchDGroupLeadersDto.exemptedAccountId,
      fetchDGroupLeadersDto.gender,
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
