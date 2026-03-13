import { Module } from '@nestjs/common';
import { MinistryRoleController } from './ministry-role.controller';
import { MinistryRoleService } from './ministry-role.service';
import { MinistryRoleRepository } from './ministry-role.repository';

@Module({
  controllers: [MinistryRoleController],
  providers: [MinistryRoleService, MinistryRoleRepository],
})
export class MinistryRoleModule {}
