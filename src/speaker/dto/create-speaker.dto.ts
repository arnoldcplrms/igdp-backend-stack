import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSpeakerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsInt()
  @IsOptional()
  accountId?: number;

  @IsInt()
  @IsOptional()
  updatedBy?: number;
}
