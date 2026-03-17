import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';
import {
  CreateDGroupMembershipDto,
  DGroupMembershipItemDto,
  FilterDGroupMembershipDto,
  createDGroupMembershipSchema,
  filterDGroupMembershipSchema,
} from './dgroup-membership.dto';
import { DGroupMembershipService } from './dgroup-membership.service';

@Controller('dgroup-membership')
export class DGroupMembershipController {
  constructor(
    private readonly dGroupMembershipService: DGroupMembershipService,
  ) {}

  @Post()
  createMany(
    @Body(new ZodValidationPipe(createDGroupMembershipSchema))
    createDto: CreateDGroupMembershipDto,
  ) {
    const memberships = createDto.memberships.map(
      (item) => new DGroupMembershipItemDto(item),
    );
    return this.dGroupMembershipService.createMany(memberships);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(filterDGroupMembershipSchema))
    filters: FilterDGroupMembershipDto,
  ) {
    return this.dGroupMembershipService.findAll(filters);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.dGroupMembershipService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dGroupMembershipService.remove(id);
  }
}
