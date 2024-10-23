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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import {
  CreateOpportunityDto,
  OpportunityDto,
  UpdateOpportunityDto,
} from './dto/createOpportunity.dto';
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
  async getAllOpportunities(): Promise<responseField<Opportunity[]>> {
    const data = await this.opportunitiesService.getAllOpportunities();
    return {
      status: 200,
      message: 'Successfully find opportunities',
      data,
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
    const imageUrl = image
      ? await saveFileToCloud(image.path, 'opportunities_img')
      : null;

    // треба дописати функцію котра буде видаляти з папки на пк якщо успішно додалось в клауденері

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
  @ApiResponse({
    status: 200,
    description: 'update opportunity ',
    type: OpportunityDto,
  })
  async updateOpportunity(
    @Body() dto: UpdateOpportunityDto,
    @Req() request: IUserRequest,
    @Param('id') id: string,
  ): Promise<responseField<Opportunity>> {
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
