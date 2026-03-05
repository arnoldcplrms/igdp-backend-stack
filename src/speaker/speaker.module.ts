import { Module } from '@nestjs/common';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { SpeakerRepository } from './speaker.repository';
import { PrismaService } from '../common/database/prisma.service';

@Module({
  controllers: [SpeakerController],
  providers: [SpeakerService, SpeakerRepository, PrismaService],
})
export class SpeakerModule {}
