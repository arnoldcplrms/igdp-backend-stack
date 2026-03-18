import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { EventMinistryController } from './event-ministry.controller';
import { EventMinistryRepository } from './event-ministry.repository';
import { EventMinistryService } from './event-ministry.service';

@Module({
  controllers: [EventMinistryController],
  providers: [EventMinistryService, EventMinistryRepository, PrismaService],
})
export class EventMinistryModule {}
