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
    isDeleted?: boolean,
    deletedBy?: number,
  ) {
    return this.attendanceRepository.findAll(
      skip,
      take,
      eventId,
      accountId,
      isDeleted,
      deletedBy,
    );
  }

  async findOne(eventId: number, accountId: number) {
    return this.attendanceRepository.findOne(eventId, accountId);
  }

  async softDelete(eventId: number, accountId: number, deletedBy: number) {
    return this.attendanceRepository.softDelete(eventId, accountId, deletedBy);
  }

  async restore(eventId: number, accountId: number) {
    return this.attendanceRepository.restore(eventId, accountId);
  }
}
