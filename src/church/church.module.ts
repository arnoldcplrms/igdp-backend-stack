import { Module } from '@nestjs/common';
import { ChurchService } from './church.service';
import { ChurchController } from './church.controller';
import { ChurchRepository } from './church.repository';

@Module({
  controllers: [ChurchController],
  providers: [ChurchService, ChurchRepository],
})
export class ChurchModule {}
