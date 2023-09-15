import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OverviewModule } from './overview/overview.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://42.193.148.96/statistic'),
    GlobalModule,
    ReportModule,
    OverviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
