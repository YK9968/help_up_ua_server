import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString({ message: 'Phone must be a string' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsInt({ message: 'Age must be an integer' })
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsBoolean({ message: 'isCompany must be a boolean value' })
  @IsNotEmpty()
  isCompany: boolean;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString({ message: 'First name must be a string' })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Phone must be a string' })
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsInt({ message: 'Age must be an integer' })
  @IsOptional()
  age?: number;

  @ApiProperty({ required: false })
  @IsBoolean({ message: 'isCompany must be a boolean value' })
  @IsOptional()
  isCompany?: boolean;
}

export class LoginUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email?: string;
}

export class AuthResponseTokensDto {
  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}
