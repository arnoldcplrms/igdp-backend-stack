import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
  findByAccountId(@Param('accountId') accountId: string) {
    return this.educationService.findByAccountId(+accountId);
  }

  @Put(':id/accountId/:accountId')
  update(
    @Param('id') id: number,
    @Param('accountId') accountId: number,
    @Body(new ZodValidationPipe(updateAccountEducationSchema))
    updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(
      Number(id),
      Number(accountId),
      updateEducationDto,
    );
  }

  @Delete(':id/accountId/:accountId')
  remove(@Param('id') id: number, @Param('accountId') accountId: number) {
    return this.educationService.remove(id, accountId);
  }
}
