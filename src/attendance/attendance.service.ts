import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceItemDto } from './attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async createMany(attendances: AttendanceItemDto[]) {
    return this.attendanceRepository.createMany(attendances);
  }

  async findAll(
    skip?: number,
    take?: number,
    eventId?: number,
    accountId?: number,
  ) {
    return this.attendanceRepository.findAll(skip, take, eventId, accountId);
  }

  async findOne(eventId: number, accountId: number) {
    return this.attendanceRepository.findOne(eventId, accountId);
  }
}
