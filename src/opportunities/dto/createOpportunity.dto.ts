import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateOpportunityDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString({ message: 'Organization name must be a string' })
  @IsNotEmpty({ message: 'Organization name is required' })
  organizationName: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString({ message: 'Date must be a valid date' })
  @IsOptional()
  date?: string;

  @IsString({ message: 'Type of work must be a string' })
  @IsNotEmpty({ message: 'Type of work is required' })
  typeWork: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location is required' })
  location: string;
}

export type TUpdateOpportunityDto = Partial<CreateOpportunityDto>;
