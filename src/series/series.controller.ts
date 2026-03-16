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
import { SeriesService } from './series.service';
import { CreateSeriesDto, createSeriesSchema } from './dto/create-series.dto';
import { UpdateSeriesDto, updateSeriesSchema } from './dto/update-series.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createSeriesSchema))
    createSeriesDto: CreateSeriesDto,
  ) {
    return this.seriesService.create(createSeriesDto);
  }

  @Get('search')
  findByName(
    @Query('name') name: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.seriesService.findByName(
      name,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.seriesService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSeriesSchema))
    updateSeriesDto: UpdateSeriesDto,
  ) {
    return this.seriesService.update(+id, updateSeriesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}
