import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { OpportunitiesService } from './opportunities.service';
import {
  CreateOpportunityDto,
  OpportunityDto,
  UpdateOpportunityDto,
} from './dto/opportunity.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from './config/types';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Opportunity } from '@prisma/client';
import { responseField } from 'src/config/responsUserField';

import { Express } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveFileToCloud } from 'src/utils/saveImgToCloud';

@ApiTags('Opportunities')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all opportunities ',
    type: [OpportunityDto],
  })
  async getAllOpportunities(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('categories') categories?: string | string[],
    @Query('location') location?: string,
  ): Promise<responseField<Opportunity[]>> {
    const [data, total] = await this.opportunitiesService.getAllOpportunities(
      page,
      limit,
      categories,
      location,
    );
    return {
      status: 200,
      message: 'Successfully find opportunities',
      data,
      total,
      page,
      limit,
    };
  }

  @Get('/my-opportunities')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'get all user opportunities ',
    type: [OpportunityDto],
  })
  async getAllUserOpportunities(
    @Req() request: IUserRequest,
  ): Promise<responseField<Opportunity[]>> {
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
  @ApiResponse({
    status: 200,
    description: 'get opportunity by id',
    type: OpportunityDto,
  })
  async getOpportunityById(
    @Param('id') id: string,
  ): Promise<responseField<Opportunity>> {
    const data = await this.opportunitiesService.getOpportunityById(id);
    return {
      status: 200,
      message: 'Successfully find  opportunity by id',
      data,
    };
  }

  @Post('my-opportunities')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOpportunityDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          const uniquePreffix = Date.now();
          const filename = `${uniquePreffix}_${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiResponse({
    status: 201,
    description: 'create opportunity ',
    type: OpportunityDto,
  })
  async createOpportunity(
    @Body() dto: CreateOpportunityDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() request: IUserRequest,
  ): Promise<responseField<Opportunity>> {
    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await saveFileToCloud(image.path, 'opportunities_img');
      await fs.unlink(image.path);
    }

    const data = await this.opportunitiesService.createOpportunity(
      { ...dto, imageUrl },
      request.user.id,
    );
    return {
      status: 201,
      message: 'Successfully create opportunity ',
      data,
    };
  }

  @Patch('my-opportunities/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateOpportunityDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          const uniquePrefix = Date.now();
          const filename = `${uniquePrefix}_${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiResponse({
    status: 200,
    description: 'update opportunity ',
    type: OpportunityDto,
  })
  async updateOpportunity(
    @Body() dto: UpdateOpportunityDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() request: IUserRequest,
    @Param('id') id: string,
  ): Promise<responseField<Opportunity>> {
    const existingOpportunity =
      await this.opportunitiesService.getOpportunityById(id);

    let imageUrl: string | null = existingOpportunity.imageUrl;

    if (image) {
      imageUrl = await saveFileToCloud(image.path, 'opportunities_img');
      await fs.unlink(image.path);
    }

    const data = await this.opportunitiesService.updateOpportunity(
      { ...dto, imageUrl },
      request.user.id,
      id,
    );
    return {
      status: 200,
      message: 'Successfully update opportunity ',
      data,
    };
  }

  @Delete('my-opportunities/:id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 204,
    description: 'delete opportunity ',
  })
  async deleteOpportunity(
    @Req() request: IUserRequest,
    @Param('id') id: string,
  ): Promise<void> {
    await this.opportunitiesService.deleteOpportunity(request.user.id, id);
  }
}
