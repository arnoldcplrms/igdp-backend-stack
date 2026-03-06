import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  eventName: string;

  @IsDateString()
  @IsNotEmpty()
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location: string;

  @IsInt()
  @IsOptional()
  seriesId?: number;

  @IsInt()
  @IsOptional()
  ministryId?: number;
}
