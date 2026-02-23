import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(createEventDto: CreateEventDto) {
    return this.eventRepository.create(createEventDto);
  }

  async findAll(
    skip?: number,
    take?: number,
    eventName?: string,
    location?: string,
    speakerId?: number,
    seriesId?: number,
    eventDate?: string,
  ) {
    return this.eventRepository.findAll(
      skip,
      take,
      eventName,
      location,
      speakerId,
      seriesId,
      eventDate,
    );
  }

  async findByName(name: string, skip?: number, take?: number) {
    return this.eventRepository.findByName(name, skip, take);
  }

  async findOne(id: number) {
    return this.eventRepository.findOne(id);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: number) {
    return this.eventRepository.remove(id);
  }
}
