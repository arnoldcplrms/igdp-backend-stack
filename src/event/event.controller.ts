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
import { EventService } from './event.service';
import { CreateEventDto, createEventSchema } from './dto/create-event.dto';
import { UpdateEventDto, updateEventSchema } from './dto/update-event.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createEventSchema))
    createEventDto: CreateEventDto,
  ) {
    return this.eventService.create(createEventDto);
  }

  @Get('search')
  findByName(
    @Query('name') name: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.eventService.findByName(
      name,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('eventName') eventName?: string,
    @Query('location') location?: string,
    @Query('seriesId') seriesId?: string,
    @Query('ministryId') ministryId?: string,
    @Query('eventDate') eventDate?: string,
  ) {
    return this.eventService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
      eventName,
      location,
      seriesId ? parseInt(seriesId) : undefined,
      ministryId ? parseInt(ministryId) : undefined,
      eventDate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateEventSchema))
    updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
