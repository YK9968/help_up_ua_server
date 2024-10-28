import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from 'src/opportunities/config/types';
import { UpdateUserDto } from 'src/auth/dto/authUser.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseField } from 'src/config/responsUserField';
import { User } from '@prisma/client';
import { userDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/error')
  throwError() {
    throw new BadRequestException();
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'update user',
    type: userDto,
  })
  async UpdateUserProdile(
    @Body() dto: UpdateUserDto,
    @Req() request: IUserRequest,
  ): Promise<responseField<Partial<User>>> {
    const data = await this.userService.updateUser(dto, request.user);
    return {
      status: 200,
      message: 'Successfully update user profile',
      data,
    };
  }
}
