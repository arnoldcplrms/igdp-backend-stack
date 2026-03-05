import { Injectable } from '@nestjs/common';
import { SpeakerRepository } from './speaker.repository';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Injectable()
export class SpeakerService {
  constructor(private readonly speakerRepository: SpeakerRepository) {}

  async create(createSpeakerDto: CreateSpeakerDto) {
    return this.speakerRepository.create(createSpeakerDto);
  }

  async findAll(skip?: number, take?: number, name?: string) {
    return this.speakerRepository.findAll(skip, take, name);
  }

  async findByName(name: string, skip?: number, take?: number) {
    return this.speakerRepository.findByName(name, skip, take);
  }

  async findOne(id: number) {
    return this.speakerRepository.findOne(id);
  }

  async update(id: number, updateSpeakerDto: UpdateSpeakerDto) {
    return this.speakerRepository.update(id, updateSpeakerDto);
  }

  async remove(id: number) {
    return this.speakerRepository.remove(id);
  }
}
