import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma.service';
import { CreateUserDto, UpdateUserDto } from 'src/auth/dto/authUser.dto';
import * as bcrypt from 'bcrypt';
import { AppErrors } from 'src/errors';
import { responseUserField } from 'src/config/responsUserField';

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

  async updateUser(dto: UpdateUserDto, { email }: Partial<User>) {
    const user = await this.findUser(email);
    if (!user) throw new BadRequestException(AppErrors.USER_NOT_FOUND);
    const newUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { ...dto },
    });

    return { ...responseUserField(newUser) };
  }
}
