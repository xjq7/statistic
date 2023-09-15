import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitSchema } from './schemas/visit.schema';

const mongooseModule = MongooseModule.forFeature([
  { name: 'visit', schema: VisitSchema },
]);

@Global()
@Module({
  imports: [mongooseModule],
  exports: [mongooseModule],
})
export class GlobalModule {}
