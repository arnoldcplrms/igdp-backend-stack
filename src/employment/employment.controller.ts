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
import { EmploymentService } from './employment.service';
import {
  CreateEmploymentDto,
  UpdateEmploymentDto,
  createEmploymentSchema,
  updateEmploymentSchema,
} from './employment.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('employment')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createEmploymentSchema))
    createEmploymentDto: CreateEmploymentDto,
  ) {
    return this.employmentService.create(createEmploymentDto);
  }

  @Get('accountId/:accountId')
  findByAccountId(
    @Param('accountId') accountId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.employmentService.findByAccountId(
      +accountId,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateEmploymentSchema))
    updateEmploymentDto: UpdateEmploymentDto,
  ) {
    return this.employmentService.update(+id, updateEmploymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employmentService.remove(+id);
  }
}
