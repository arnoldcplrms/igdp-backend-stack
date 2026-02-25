import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, SoftDeleteAttendanceDto } from './attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.createMany(createAttendanceDto.attendances);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('eventId') eventId?: string,
    @Query('accountId') accountId?: string,
    @Query('isDeleted') isDeleted?: string,
    @Query('deletedBy') deletedBy?: string,
  ) {
    return this.attendanceService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
      eventId ? parseInt(eventId) : undefined,
      accountId ? parseInt(accountId) : undefined,
      isDeleted !== undefined ? isDeleted === 'true' : undefined,
      deletedBy ? parseInt(deletedBy) : undefined,
    );
  }

  @Get(':eventId/:accountId')
  findOne(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
  ) {
    return this.attendanceService.findOne(eventId, accountId);
  }

  @Patch(':eventId/:accountId/soft-delete')
  softDelete(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() softDeleteDto: SoftDeleteAttendanceDto,
  ) {
    return this.attendanceService.softDelete(
      eventId,
      accountId,
      softDeleteDto.deletedBy,
    );
  }

  @Patch(':eventId/:accountId/restore')
  restore(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
  ) {
    return this.attendanceService.restore(eventId, accountId);
  }
}
