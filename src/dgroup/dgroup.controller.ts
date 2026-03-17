import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';
import {
  CreateDGroupDto,
  FilterDGroupDto,
  UpdateDGroupDto,
  createDGroupSchema,
  filterDGroupSchema,
  updateDGroupSchema,
} from './dgroup.dto';
import { DGroupService } from './dgroup.service';

@Controller('dgroup')
export class DGroupController {
  constructor(private readonly dGroupService: DGroupService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createDGroupSchema))
    createDGroupDto: CreateDGroupDto,
  ) {
    return this.dGroupService.create(createDGroupDto);
  }

  @Get()
  findMany(
    @Query(new ZodValidationPipe(filterDGroupSchema))
    filters: FilterDGroupDto,
  ) {
    return this.dGroupService.findMany(filters);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateDGroupSchema))
    updateDGroupDto: UpdateDGroupDto,
  ) {
    return this.dGroupService.update(+id, updateDGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dGroupService.remove(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.dGroupService.findById(+id);
  }
}
