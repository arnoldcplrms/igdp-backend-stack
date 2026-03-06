import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { MinistryController } from './ministry.controller';
import { MinistryRepository } from './ministry.repository';

@Module({
  controllers: [MinistryController],
  providers: [MinistryService, MinistryRepository],
})
export class MinistryModule {}
