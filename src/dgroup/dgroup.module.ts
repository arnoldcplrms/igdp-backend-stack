import { Module } from '@nestjs/common';
import { DGroupController } from './dgroup.controller';
import { DGroupRepository } from './dgroup.repository';
import { DGroupService } from './dgroup.service';

@Module({
  controllers: [DGroupController],
  providers: [DGroupService, DGroupRepository],
})
export class DGroupModule {}
