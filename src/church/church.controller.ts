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
import { ChurchService } from './church.service';
import {
  createChurchSchema,
  updateChurchSchema,
  type CreateChurchDto,
  type UpdateChurchDto,
} from './church.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createChurchSchema))
    createChurchDto: CreateChurchDto,
  ) {
    return this.churchService.create(createChurchDto);
  }

  @Get()
  findMany(
    @Query('search') search?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.churchService.findMany(
      search,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.churchService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateChurchSchema))
    updateChurchDto: UpdateChurchDto,
  ) {
    return this.churchService.update(+id, updateChurchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.churchService.remove(+id);
  }
}
