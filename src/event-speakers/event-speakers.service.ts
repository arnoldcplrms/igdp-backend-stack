import { Injectable } from '@nestjs/common';
import { EventSpeakersRepository } from './event-speakers.repository';
import { EventSpeakerItemDto } from './event-speakers.dto';

@Injectable()
export class EventSpeakersService {
  constructor(
    private readonly eventSpeakersRepository: EventSpeakersRepository,
  ) {}

  async createMany(eventSpeakers: EventSpeakerItemDto[]) {
    return this.eventSpeakersRepository.createMany(eventSpeakers);
  }

  async findAll(
    skip?: number,
    take?: number,
    eventId?: number,
    speakerId?: number,
  ) {
    return this.eventSpeakersRepository.findAll(skip, take, eventId, speakerId);
  }

  async findOne(speakerId: number, eventId: number) {
    return this.eventSpeakersRepository.findOne(speakerId, eventId);
  }

  async findBySpeakerId(speakerId: number, skip?: number, take?: number) {
    return this.eventSpeakersRepository.findBySpeakerId(speakerId, skip, take);
  }

  async findByEventId(eventId: number, skip?: number, take?: number) {
    return this.eventSpeakersRepository.findByEventId(eventId, skip, take);
  }

  async remove(speakerId: number, eventId: number) {
    return this.eventSpeakersRepository.remove(speakerId, eventId);
  }
}
