import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateOpportunityDto,
  UpdateOpportunityDto,
} from './dto/opportunity.dto';
import { PrismaService } from 'prisma.service';
import { Opportunity } from '@prisma/client';
import { AppErrors } from 'src/errors';
import { VolunteerType } from './config/types';

@Injectable()
export class OpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  private async findOpportunity(
    id: string,
    userId?: string,
  ): Promise<Opportunity> {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: userId ? { id, userId } : { id },
    });
    if (!opportunity) {
      throw new BadRequestException(AppErrors.OPPORTUNITY_NOT_FOUND);
    }
    return opportunity;
  }

  async getAllOpportunities(
    page?: number,
    limit?: number,
    categories?: string | string[],
    location?: string,
  ): Promise<[Opportunity[], number]> {
    const parsedPage = Math.max(1, page);
    const parsedLimit = Math.max(1, limit);
    const skip = (parsedPage - 1) * parsedLimit;
    let where: any = {};

    if (location) {
      where.location = location;
    }

    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : [categories];

      where = {
        typeWork: {
          in: categoryArray.map(
            (category: string) =>
              VolunteerType[category as keyof typeof VolunteerType],
          ),
        },
      };
    }

    const opportunities = await this.prisma.opportunity.findMany({
      where,
      skip,
      take: parsedLimit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.opportunity.count({ where });

    return [opportunities, total];
  }

  async getOpportunityById(id: string): Promise<Opportunity> {
    const opportunities = await this.findOpportunity(id);
    return opportunities;
  }

  async getUserOpportunities(userId: string): Promise<Opportunity[]> {
    const opportunities = await this.prisma.opportunity.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return opportunities;
  }

  async createOpportunity(
    dto: CreateOpportunityDto,
    id: string,
  ): Promise<Opportunity> {
    const date = dto.date ? new Date(dto.date) : undefined;
    const imageUrl = typeof dto.imageUrl === 'string' ? dto.imageUrl : null;

    const opportunities = await this.prisma.opportunity.create({
      data: {
        userId: id,
        title: dto.title,
        description: dto.description,
        location: dto.location,
        organizationName: dto.organizationName,
        website: dto.website,
        email: dto.email,
        date,
        typeWork: dto.typeWork,
        imageUrl,
      },
    });

    return opportunities;
  }

  async updateOpportunity(
    dto: UpdateOpportunityDto,
    userId: string,
    id: string,
  ): Promise<Opportunity> {
    try {
      await this.findOpportunity(id, userId);
      const imageUrl = typeof dto.imageUrl === 'string' ? dto.imageUrl : null;
      const date = dto.date ? new Date(dto.date).toISOString() : null;

      const opportunity = await this.prisma.opportunity.update({
        where: { id, userId },
        data: { ...dto, imageUrl, date },
      });

      return opportunity;
    } catch (error) {
      console.log(error.message);
    }
  }
  async deleteOpportunity(userId: string, id: string): Promise<string> {
    await this.findOpportunity(id, userId);

    const data = await this.prisma.opportunity.delete({
      where: { id, userId },
    });

    return data.id;
  }
}
