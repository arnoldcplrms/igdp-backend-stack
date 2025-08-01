import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { SchoolRepository } from './school.repository';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, SchoolRepository],
})
export class SchoolModule {}
