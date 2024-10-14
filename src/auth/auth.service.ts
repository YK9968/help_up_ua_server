import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/authUser.dto';
import { AppErrors } from 'src/errors';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<User> {
    const isExists = await this.userService.findUser(dto.email);

    if (isExists) throw new BadRequestException(AppErrors.USER_EXISTS);

    const user = await this.userService.createUser(dto);

    return user;
  }

  async loginUser(dto: LoginUserDto) {
    const user = await this.userService.findUser(dto.email);
    if (!user) throw new BadRequestException(AppErrors.NOT_FOUND);

    const validatePassword = await bcrypt.compare(dto.password, user.password);
    if (!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA);

    return user;
  }
}
