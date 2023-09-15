import { IsOptional, IsString } from 'class-validator';

export class OverviewDto {
  @IsString()
  @IsOptional()
  startAt: string;

  @IsString()
  @IsOptional()
  endAt: string;
}
