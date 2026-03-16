import { Injectable } from '@nestjs/common';
import { SeriesRepository } from './series.repository';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async create(createSeriesDto: CreateSeriesDto) {
    return this.seriesRepository.create(createSeriesDto);
  }

  async findAll(skip?: number, take?: number) {
    return this.seriesRepository.findAll(skip, take);
  }

  async findByName(name: string, skip?: number, take?: number) {
    return this.seriesRepository.findByName(name, skip, take);
  }

  async findOne(id: number) {
    return this.seriesRepository.findOne(id);
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return this.seriesRepository.update(id, updateSeriesDto);
  }

  async remove(id: number) {
    return this.seriesRepository.remove(id);
  }
}
