import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { CreateUserDto } from './dto/authUser.dto';
import { AppErrors } from 'src/errors';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const SALT = 10;

    const isExists = await this.userService.findUser(dto.email);

    if (isExists) throw new BadRequestException(AppErrors.USER_EXISTS);

    const hashPassword = await bcrypt.hash(dto.password, SALT);

    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    return user;
  }
}
