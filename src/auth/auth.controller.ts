import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
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
import { AppErrors } from 'src/errors';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('/refresh-user')
  @UseGuards(AuthGuard('jwt'))
  async refreshUser(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException(AppErrors.UNAUTHORIZE);
    }

    const refreshToken = authorization.replace('Bearer ', '');
    if (!refreshToken) {
      throw new UnauthorizedException(AppErrors.UNAUTHORIZE);
    }
    const data = await this.authService.refreshUser(refreshToken);
    const user = {
      id: data.id,
      emil: data.email,
      name: data.firstName,
    };

    return {
      status: 200,
      message: 'Successfully refreshed user',
      data: user,
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
