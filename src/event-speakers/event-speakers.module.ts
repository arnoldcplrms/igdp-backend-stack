import { Module } from '@nestjs/common';
import { EventSpeakersController } from './event-speakers.controller';
import { EventSpeakersService } from './event-speakers.service';
import { EventSpeakersRepository } from './event-speakers.repository';
import { PrismaService } from '../common/database/prisma.service';

@Module({
  controllers: [EventSpeakersController],
  providers: [EventSpeakersService, EventSpeakersRepository, PrismaService],
})
export class EventSpeakersModule {}
