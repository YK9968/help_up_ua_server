import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/authUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: CreateUserDto) {
    const user = await this.authService.registerUser(dto);
    const { firstName, lastName, email } = user;

    const data = {
      firstName,
      lastName,
      email,
    };

    return {
      status: 201,
      message: 'Successfully create user',
      data,
    };
  }

  @HttpCode(200)
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() dto: LoginUserDto) {
    const user = await this.authService.loginUser(dto);
    return {
      status: 200,
      message: 'Successfully login user',
      data: user,
    };
  }
}
