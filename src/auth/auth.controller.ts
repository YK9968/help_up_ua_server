import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponseDto,
  AuthResponseTokensDto,
  CreateUserDto,
  LoginUserDto,
} from './dto/authUser.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseField } from 'src/config/responsUserField';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'register user',
    type: AuthResponseDto,
  })
  async registerUser(
    @Body() dto: CreateUserDto,
  ): Promise<responseField<AuthResponseDto>> {
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
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'login user',
    type: AuthResponseDto,
  })
  async loginUser(
    @Body() dto: LoginUserDto,
  ): Promise<responseField<AuthResponseDto>> {
    const data = await this.authService.loginUser(dto);
    return {
      status: 200,
      message: `Successfully login user ${data.firstName}`,
      data,
    };
  }

  @Post('acces-token')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: String, description: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'get new tokens',
    type: AuthResponseTokensDto,
  })
  async getNewTokens(
    @Body() dto: RefreshTokenDto,
  ): Promise<responseField<AuthResponseDto>> {
    const data = await this.authService.getTokens(dto.refreshToken);
    return {
      status: 200,
      message: 'Successfully get tokens',
      data,
    };
  }
}
