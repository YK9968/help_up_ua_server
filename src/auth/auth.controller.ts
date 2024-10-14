import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/authUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: CreateUserDto) {
    const user = await this.authService.createUser(dto);
    const { id, firstName, lastName, email } = user;

    const newUser = {
      id,
      firstName,
      lastName,
      email,
    };

    return {
      status: 201,
      message: 'Successfully create user',
      data: newUser,
    };
  }
}
