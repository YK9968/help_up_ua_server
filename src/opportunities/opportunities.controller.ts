import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import {
  CreateOpportunityDto,
  TUpdateOpportunityDto,
} from './dto/createOpportunity.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from './config/types';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  async getAllOpportunities() {
    const data = await this.opportunitiesService.getAllOpportunities();
    return {
      status: 200,
      message: 'Successfully find opportunities',
      data,
    };
  }

  @Get('/my-opportunities')
  @UseGuards(AuthGuard('jwt'))
  async getAllUserOpportunities(@Req() request: IUserRequest) {
    const data = await this.opportunitiesService.getUserOpportunities(
      request.user.id,
    );
    return {
      status: 200,
      message: 'Successfully find user opportunities',
      data,
    };
  }

  @Get('/:id')
  async getOpportunityById(@Param('id') id: string) {
    const data = await this.opportunitiesService.getOpportunityById(id);
    return {
      status: 200,
      message: 'Successfully find  opportunity by id',
      data,
    };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async createOpportunity(
    @Body() dto: CreateOpportunityDto,
    @Req() request: IUserRequest,
  ) {
    const data = await this.opportunitiesService.createOpportunity(
      dto,
      request.user.id,
    );
    return {
      status: 201,
      message: 'Successfully create opportunity ',
      data,
    };
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async updateOpportunity(
    @Body() dto: TUpdateOpportunityDto,
    @Req() request: IUserRequest,
    @Param('id') id: string,
  ) {
    const data = await this.opportunitiesService.updateOpportunity(
      dto,
      request.user.id,
      id,
    );
    return {
      status: 200,
      message: 'Successfully update opportunity ',
      data,
    };
  }

  @Delete('/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async deleteOpportunity(
    @Req() request: IUserRequest,
    @Param('id') id: string,
  ): Promise<void> {
    await this.opportunitiesService.deleteOpportunity(request.user.id, id);
  }
}
