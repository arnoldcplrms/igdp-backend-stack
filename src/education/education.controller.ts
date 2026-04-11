import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { EducationService } from './education.service';
import {
  CreateEducationDto,
  createEducationSchema,
  updateAccountEducationSchema,
  UpdateEducationDto,
} from './education.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createEducationSchema))
    createEducationDto: CreateEducationDto,
  ) {
    return this.educationService.create(createEducationDto);
  }

  @Get('accountId/:accountId')
  findByAccountId(
    @Param('accountId') accountId: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.educationService.findByAccountId(
      +accountId,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.educationService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateAccountEducationSchema))
    updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(Number(id), updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.educationService.remove(id);
  }
}
