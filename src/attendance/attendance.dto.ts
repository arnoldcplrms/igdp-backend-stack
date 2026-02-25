import {
  IsInt,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttendanceItemDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsInt()
  @IsNotEmpty()
  accountId: number;
}

export class CreateAttendanceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceItemDto)
  attendances: AttendanceItemDto[];
}

export class SoftDeleteAttendanceDto {
  @IsInt()
  @IsNotEmpty()
  deletedBy: number;
}

export class FilterAttendanceDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  eventId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  accountId?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isDeleted?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  deletedBy?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;
}
