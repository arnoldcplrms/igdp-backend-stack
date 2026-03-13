import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validations.pipe';
import {
  CreateMinistryRolesDto,
  FilterMinistryRoleDto,
  UpdateMinistryRoleDto,
  createMinistryRolesSchema,
  filterMinistryRoleSchema,
  updateMinistryRoleSchema,
} from './ministry-role.dto';
import { MinistryRoleService } from './ministry-role.service';

@Controller('ministry-roles')
export class MinistryRoleController {
  constructor(private readonly ministryRoleService: MinistryRoleService) {}

  @Post()
  createMany(
    @Body(new ZodValidationPipe(createMinistryRolesSchema))
    createMinistryRolesDto: CreateMinistryRolesDto,
  ) {
    return this.ministryRoleService.createMany(createMinistryRolesDto);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(filterMinistryRoleSchema))
    filters: FilterMinistryRoleDto,
  ) {
    return this.ministryRoleService.findAll(filters);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.ministryRoleService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMinistryRoleSchema))
    updateMinistryRoleDto: UpdateMinistryRoleDto,
  ) {
    return this.ministryRoleService.update(id, updateMinistryRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ministryRoleService.remove(id);
  }
}
