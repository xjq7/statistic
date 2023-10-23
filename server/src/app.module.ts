import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OverviewModule } from './overview/overview.module';
import { GlobalModule } from './global.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/statistic'),
    GlobalModule,
    ReportModule,
    OverviewModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 6,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
