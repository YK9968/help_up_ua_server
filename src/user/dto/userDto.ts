import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class userDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  email: string;
}
