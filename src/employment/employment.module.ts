import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { EmploymentRepository } from './employment.repository';

@Module({
  controllers: [EmploymentController],
  providers: [EmploymentService, EmploymentRepository],
})
export class EmploymentModule {}
