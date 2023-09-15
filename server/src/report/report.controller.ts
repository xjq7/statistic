import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as dayjs from 'dayjs';
import { Ip } from '../decorator/Ip';
import { ReportData, ReportService } from './report.service';

@Controller('/v1/visit')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(204)
  postReport(
    @Body()
    body: ReportData,
    @Ip() ip: string,
  ) {
    const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.reportService.batchInsertVisit({ ...body, ip, createdAt });
  }
}
