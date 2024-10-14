import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @IsInt({ message: 'Age must be an integer' })
  age: number;

  @IsBoolean({ message: 'isCompany must be a boolean value' })
  isCompany: boolean;
}

export type TUpdateUserDto = Partial<CreateUserDto>;

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
