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
import {
  CreateSpeakerDto,
  createSpeakerSchema,
} from './dto/create-speaker.dto';
import {
  UpdateSpeakerDto,
  updateSpeakerSchema,
} from './dto/update-speaker.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createSpeakerSchema))
    createSpeakerDto: CreateSpeakerDto,
  ) {
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
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSpeakerSchema))
    updateSpeakerDto: UpdateSpeakerDto,
  ) {
    return this.speakerService.update(+id, updateSpeakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speakerService.remove(+id);
  }
}
