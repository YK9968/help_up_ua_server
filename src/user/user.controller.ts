import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from 'src/opportunities/config/types';
import { TUpdateUserDto } from 'src/auth/dto/authUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async UpdateUserProdile(
    @Body() dto: TUpdateUserDto,
    @Req() request: IUserRequest,
  ) {
    const user = await this.userService.updateUser(dto, request.user);
    return {
      status: 200,
      message: 'Successfully update user profile',
      data: {
        firstName: user.firstName,
        email: user.email,
      },
    };
  }
}
