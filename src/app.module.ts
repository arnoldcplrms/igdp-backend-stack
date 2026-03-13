import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { DatabaseModule } from './common/database/database.module';
import { CompanyModule } from './company/company.module';
import { AccountModule } from './account/account.module';
import { EducationModule } from './education/education.module';
import { EmploymentModule } from './employment/employment.module';
import { SeriesModule } from './series/series.module';
import { EventModule } from './event/event.module';
import { AttendanceModule } from './attendance/attendance.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SpeakerModule } from './speaker/speaker.module';
import { EventSpeakersModule } from './event-speakers/event-speakers.module';
import { MinistryModule } from './ministry/ministry.module';
import { MinistryRoleModule } from './ministry-role/ministry-role.module';
import { AccountMinistryModule } from './account-ministry/account-ministry.module';

@Module({
  imports: [
    SchoolModule,
    DatabaseModule,
    CompanyModule,
    AccountModule,
    EducationModule,
    EmploymentModule,
    SeriesModule,
    EventModule,
    AttendanceModule,
    DashboardModule,
    SpeakerModule,
    EventSpeakersModule,
    MinistryModule,
    MinistryRoleModule,
    AccountMinistryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
