import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';
import { VolunteerType } from '../config/types';

export class CreateOpportunityDto {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'Organization name must be a string' })
  @IsNotEmpty({ message: 'Organization name is required' })
  organizationName: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Date must be a valid date' })
  @IsOptional()
  date?: string;

  @ApiProperty({ enum: VolunteerType })
  @IsEnum(VolunteerType, { message: 'Type of work must be a valid option' })
  @IsNotEmpty({ message: 'Type of work is required' })
  typeWork: VolunteerType;

  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: Express.Multer.File | string;

  @ApiProperty()
  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location is required' })
  location: string;
}

export class UpdateOpportunityDto {
  @ApiProperty({ required: false })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Organization name must be a string' })
  @IsOptional()
  organizationName?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ required: false })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Date must be a valid date' })
  @IsOptional()
  date?: string;

  @ApiProperty({ enum: VolunteerType })
  @IsEnum(VolunteerType, { message: 'Type of work must be a valid option' })
  @IsNotEmpty({ message: 'Type of work is required' })
  typeWork: VolunteerType;

  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: Express.Multer.File | string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;
}

export class OpportunityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  organizationName: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  typeWork: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty()
  location: string;
}
