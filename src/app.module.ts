import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { DatabaseModule } from './common/database/database.module';
import { CompanyModule } from './company/company.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [SchoolModule, DatabaseModule, CompanyModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
