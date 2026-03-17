import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  CreateAttendanceDto,
  AttendanceItemDto,
  createAttendanceSchema,
} from './attendance.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createAttendanceSchema))
    createAttendanceDto: CreateAttendanceDto,
  ) {
    const attendances = createAttendanceDto.attendances.map(
      (item) => new AttendanceItemDto(item),
    );
    return this.attendanceService.createMany(attendances);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('eventId') eventId?: string,
    @Query('accountId') accountId?: string,
  ) {
    return this.attendanceService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
      eventId ? parseInt(eventId) : undefined,
      accountId ? parseInt(accountId) : undefined,
    );
  }

  @Get(':eventId/:accountId')
  findOne(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
  ) {
    return this.attendanceService.findOne(eventId, accountId);
  }
}
