import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { MinistryService } from './ministry.service';
import {
  createMinistrySchema,
  updateMinistrySchema,
  type CreateMinistryDto,
  type UpdateMinistryDto,
} from './ministry.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';

@Controller('ministry')
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createMinistrySchema))
    createMinistryDto: CreateMinistryDto,
  ) {
    return this.ministryService.create(createMinistryDto);
  }

  @Get()
  findByNameOrAll(@Query('name') name?: string) {
    if (name) {
      return this.ministryService.findByName(name);
    }
    return this.ministryService.findAll();
  }

  @Get('main')
  findAllMain() {
    return this.ministryService.findAllMain();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateMinistrySchema))
    updateMinistryDto: UpdateMinistryDto,
  ) {
    return this.ministryService.update(+id, updateMinistryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministryService.remove(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ministryService.findById(+id);
  }
}
