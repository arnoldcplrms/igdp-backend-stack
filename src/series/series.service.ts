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

  async findAll() {
    return this.seriesRepository.findAll();
  }

  async findByName(name: string) {
    return this.seriesRepository.findByName(name);
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
