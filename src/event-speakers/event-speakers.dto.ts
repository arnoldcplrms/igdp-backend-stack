import { IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EventSpeakerItemDto {
  @IsInt()
  @IsNotEmpty()
  speakerId: number;

  @IsInt()
  @IsNotEmpty()
  eventId: number;
}

export class CreateEventSpeakersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventSpeakerItemDto)
  eventSpeakers: EventSpeakerItemDto[];
}
