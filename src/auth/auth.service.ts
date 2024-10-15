import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { responseUserField } from '../config/responsUserField';
import { CreateUserDto, LoginUserDto } from './dto/authUser.dto';
import { AppErrors } from 'src/errors';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException(AppErrors.UNAUTHORIZE);

    const user = await this.userService.findUser(result.email);
    const tokens = await this.issueTokens(user.email);

    return { ...tokens };
  }

  async registerUser(dto: CreateUserDto) {
    const isExists = await this.userService.findUser(dto.email);
    if (isExists) throw new BadRequestException(AppErrors.USER_EXISTS);

    const user = await this.userService.createUser(dto);
    const tokens = await this.issueTokens(user.email);

    return { ...responseUserField(user), ...tokens };
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userService.findUser(dto.email);
    if (!user) throw new BadRequestException(AppErrors.NOT_FOUND);

    const validatePassword = await bcrypt.compare(dto.password, user.password);
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    const tokens = await this.issueTokens(user.email);

    return { ...responseUserField(user), ...tokens };
  }

  private async issueTokens(email: string) {
    const data = { email };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
