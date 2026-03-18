import { Injectable } from '@nestjs/common';
import {
  EventMinistryItemDto,
  UpdateEventMinistryDto,
} from './event-ministry.dto';
import { EventMinistryRepository } from './event-ministry.repository';

@Injectable()
export class EventMinistryService {
  constructor(
    private readonly eventMinistryRepository: EventMinistryRepository,
  ) {}

  createMany(eventMinistries: EventMinistryItemDto[]) {
    return this.eventMinistryRepository.createMany(eventMinistries);
  }

  findAll(
    skip?: number,
    take?: number,
    eventId?: number,
    ministryId?: number,
    isPrimaryOrganizer?: boolean,
  ) {
    return this.eventMinistryRepository.findAll(
      skip,
      take,
      eventId,
      ministryId,
      isPrimaryOrganizer,
    );
  }

  findByEventId(eventId: number, skip?: number, take?: number) {
    return this.eventMinistryRepository.findByEventId(eventId, skip, take);
  }

  findByMinistryId(ministryId: number, skip?: number, take?: number) {
    return this.eventMinistryRepository.findByMinistryId(
      ministryId,
      skip,
      take,
    );
  }

  findOne(eventId: number, ministryId: number) {
    return this.eventMinistryRepository.findOne(eventId, ministryId);
  }

  update(
    eventId: number,
    ministryId: number,
    updateEventMinistryDto: UpdateEventMinistryDto,
  ) {
    return this.eventMinistryRepository.update(
      eventId,
      ministryId,
      updateEventMinistryDto,
    );
  }

  remove(eventId: number, ministryId: number) {
    return this.eventMinistryRepository.remove(eventId, ministryId);
  }
}
