import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { VisitSchema } from '../schemas/visit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'visit', schema: VisitSchema }]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
