import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty()
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty()
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  password: string;

  @IsString({ message: 'Phone must be a string' })
  @IsNotEmpty()
  phone: string;

  @IsInt({ message: 'Age must be an integer' })
  @IsNotEmpty()
  age: number;

  @IsBoolean({ message: 'isCompany must be a boolean value' })
  @IsNotEmpty()
  isCompany: boolean;
}

export type TUpdateUserDto = Partial<CreateUserDto>;

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  password: string;
}
