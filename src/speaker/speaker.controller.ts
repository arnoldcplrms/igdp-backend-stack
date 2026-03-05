import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Post()
  create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakerService.create(createSpeakerDto);
  }

  @Get('search')
  findByName(
    @Query('name') name: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.speakerService.findByName(
      name,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
    );
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('name') name?: string,
  ) {
    return this.speakerService.findAll(
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
      name,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speakerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeakerDto: UpdateSpeakerDto) {
    return this.speakerService.update(+id, updateSpeakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speakerService.remove(+id);
  }
}
