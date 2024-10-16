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
    const opportunities = await this.opportunitiesService.getAllOpportunities();
    return opportunities;
  }
  @Get('/:id')
  async getOpportunityById(@Param('id') id: string) {
    const opportunities =
      await this.opportunitiesService.getOpportunityById(id);
    return opportunities;
  }
  @Get('/my-opportunities')
  async getAllUserOpportunities() {
    const opportunities =
      await this.opportunitiesService.getAllUserOpportunities();
    return opportunities;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async createOpportunity(
    @Body() dto: CreateOpportunityDto,
    @Req() request: IUserRequest,
  ) {
    const opportunities = await this.opportunitiesService.createOpportunity(
      dto,
      request.user.id,
    );
    return opportunities;
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async updateOpportunity(
    @Body() dto: TUpdateOpportunityDto,
    @Req() request: IUserRequest,
    @Param('id') id: string,
  ) {
    const opportunities = await this.opportunitiesService.updateOpportunity(
      dto,
      request.user.id,
      id,
    );
    return opportunities;
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
