import { IsOptional, IsString } from 'class-validator';
import { Dimension } from '../overview/overview.service';
import { DateFilterDto } from './common';

export class DeviceDto extends DateFilterDto {
  @IsString()
  @IsOptional()
  type: Dimension;
}

export class GetChannelStatDto extends DateFilterDto {}
