import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateSeriesDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsInt()
  @IsOptional()
  ministryId?: number;
}
