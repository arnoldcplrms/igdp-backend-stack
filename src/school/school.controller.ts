import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UsePipes,
  Put,
} from '@nestjs/common';
import { SchoolService } from './school.service';

import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';
import {
  createSchoolSchema,
  updateSchoolSchema,
  type CreateSchoolDto,
  type UpdateSchoolDto,
} from './dto/school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSchoolSchema))
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  find(@Query('name') name: string) {
    return this.schoolService.find(name);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateSchoolSchema))
    updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.update(Number(id), updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.remove(+id);
  }
}
