import { Module } from '@nestjs/common';
import { DGroupMembershipController } from './dgroup-membership.controller';
import { DGroupMembershipRepository } from './dgroup-membership.repository';
import { DGroupMembershipService } from './dgroup-membership.service';

@Module({
  controllers: [DGroupMembershipController],
  providers: [DGroupMembershipService, DGroupMembershipRepository],
  exports: [DGroupMembershipService],
})
export class DGroupMembershipModule {}
