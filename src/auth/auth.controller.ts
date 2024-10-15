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
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: CreateUserDto) {
    const data = await this.authService.registerUser(dto);

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
    const data = await this.authService.loginUser(dto);
    return {
      status: 200,
      message: `Successfully login user ${data.firstName}`,
      data,
    };
  }

  @Post('acces-token')
  @UsePipes(new ValidationPipe())
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    const data = await this.authService.getTokens(dto.refreshToken);
    return {
      status: 200,
      message: 'Successfully get tokens',
      data,
    };
  }
}
