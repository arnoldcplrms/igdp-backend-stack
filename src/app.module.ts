import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SchoolModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
