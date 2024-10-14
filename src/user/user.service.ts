import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { CreateUserDto } from 'src/auth/dto/authUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(email: string): Promise<User> | null {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const SALT = 10;

    const hashPassword = await bcrypt.hash(dto.password, SALT);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashPassword },
    });
    return user;
  }
}
