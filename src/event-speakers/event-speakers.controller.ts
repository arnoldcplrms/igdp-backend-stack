import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EventSpeakersService } from './event-speakers.service';
import {
  CreateEventSpeakersDto,
  EventSpeakerItemDto,
  createEventSpeakersSchema,
} from './event-speakers.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('event-speakers')
export class EventSpeakersController {
  constructor(private readonly eventSpeakersService: EventSpeakersService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createEventSpeakersSchema))
    createEventSpeakersDto: CreateEventSpeakersDto,
  ) {
    const eventSpeakers = createEventSpeakersDto.eventSpeakers.map(
      (item) => new EventSpeakerItemDto(item),
    );
    return this.eventSpeakersService.createMany(eventSpeakers);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('eventId') eventId?: string,
    @Query('speakerId') speakerId?: string,
  ) {
    return this.eventSpeakersService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
      eventId ? parseInt(eventId) : undefined,
      speakerId ? parseInt(speakerId) : undefined,
    );
  }

  @Get('speaker/:speakerId')
  findBySpeakerId(@Param('speakerId', ParseIntPipe) speakerId: number) {
    return this.eventSpeakersService.findBySpeakerId(speakerId);
  }

  @Get('event/:eventId')
  findByEventId(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.eventSpeakersService.findByEventId(eventId);
  }

  @Get(':speakerId/:eventId')
  findOne(
    @Param('speakerId', ParseIntPipe) speakerId: number,
    @Param('eventId', ParseIntPipe) eventId: number,
  ) {
    return this.eventSpeakersService.findOne(speakerId, eventId);
  }

  @Delete(':speakerId/:eventId')
  remove(
    @Param('speakerId', ParseIntPipe) speakerId: number,
    @Param('eventId', ParseIntPipe) eventId: number,
  ) {
    return this.eventSpeakersService.remove(speakerId, eventId);
  }
}
