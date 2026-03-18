import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';
import {
  CreateEventMinistriesDto,
  EventMinistryItemDto,
  UpdateEventMinistryDto,
  createEventMinistriesSchema,
  updateEventMinistrySchema,
} from './event-ministry.dto';
import { EventMinistryService } from './event-ministry.service';

@Controller('event-ministries')
export class EventMinistryController {
  constructor(private readonly eventMinistryService: EventMinistryService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createEventMinistriesSchema))
    createEventMinistriesDto: CreateEventMinistriesDto,
  ) {
    const eventMinistries = createEventMinistriesDto.eventMinistries.map(
      (item) => new EventMinistryItemDto(item),
    );

    return this.eventMinistryService.createMany(eventMinistries);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('eventId') eventId?: string,
    @Query('ministryId') ministryId?: string,
    @Query('isPrimaryOrganizer') isPrimaryOrganizer?: string,
  ) {
    const parsedIsPrimaryOrganizer =
      isPrimaryOrganizer === 'true'
        ? true
        : isPrimaryOrganizer === 'false'
          ? false
          : undefined;

    return this.eventMinistryService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
      eventId ? parseInt(eventId) : undefined,
      ministryId ? parseInt(ministryId) : undefined,
      parsedIsPrimaryOrganizer,
    );
  }

  @Get('event/:eventId')
  findByEventId(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.eventMinistryService.findByEventId(
      eventId,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get('ministry/:ministryId')
  findByMinistryId(
    @Param('ministryId', ParseIntPipe) ministryId: number,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.eventMinistryService.findByMinistryId(
      ministryId,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get(':eventId/:ministryId')
  findOne(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('ministryId', ParseIntPipe) ministryId: number,
  ) {
    return this.eventMinistryService.findOne(eventId, ministryId);
  }

  @Patch(':eventId/:ministryId')
  update(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('ministryId', ParseIntPipe) ministryId: number,
    @Body(new ZodValidationPipe(updateEventMinistrySchema))
    updateEventMinistryDto: UpdateEventMinistryDto,
  ) {
    return this.eventMinistryService.update(
      eventId,
      ministryId,
      updateEventMinistryDto,
    );
  }

  @Delete(':eventId/:ministryId')
  remove(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('ministryId', ParseIntPipe) ministryId: number,
  ) {
    return this.eventMinistryService.remove(eventId, ministryId);
  }
}
