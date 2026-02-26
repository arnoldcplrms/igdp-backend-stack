import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { EducationRespository } from './education.repository';

@Module({
  controllers: [EducationController],
  providers: [EducationService, EducationRespository],
})
export class EducationModule {}
