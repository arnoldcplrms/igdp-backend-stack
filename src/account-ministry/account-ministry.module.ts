import { Module } from '@nestjs/common';
import { AccountMinistryController } from './account-ministry.controller';
import { AccountMinistryService } from './account-ministry.service';
import { AccountMinistryRepository } from './account-ministry.repository';

@Module({
  controllers: [AccountMinistryController],
  providers: [AccountMinistryService, AccountMinistryRepository],
})
export class AccountMinistryModule {}
