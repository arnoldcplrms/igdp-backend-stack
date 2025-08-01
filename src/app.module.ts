import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { DatabaseModule } from './common/database/database.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [SchoolModule, DatabaseModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
