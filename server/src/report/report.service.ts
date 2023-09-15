import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitDocument } from 'src/schemas/visit.schema';

export interface ReportData {
  appId: string;
  ip: string;
  createdAt: string;
  [K: string]: any;
}

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('visit')
    private visitModel: Model<VisitDocument>,
  ) {}

  async batchInsertVisit(data: ReportData) {
    try {
      await this.visitModel.insertMany(data);
    } catch (error) {
      console.log(error);
    }
  }
}
