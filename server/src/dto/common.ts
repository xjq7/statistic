import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PagerDto {
  @Type(() => Number)
  page: number;

  @Type(() => Number)
  pageSize: number;
}

export class DateFilterDto {
  @IsString()
  @IsOptional()
  startAt: string;

  @IsString()
  @IsOptional()
  endAt: string;
}
