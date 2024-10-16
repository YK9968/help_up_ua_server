import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateOpportunityDto,
  TUpdateOpportunityDto,
} from './dto/createOpportunity.dto';
import { PrismaService } from 'prisma.service';
import { Opportunity } from '@prisma/client';
import { AppErrors } from 'src/errors';

@Injectable()
export class OpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOpportunities(): Promise<Opportunity[]> {
    const opportunities = await this.prisma.opportunity.findMany();
    return opportunities;
  }
  async getOpportunityById(id: string) {
    const opportunities = await this.prisma.opportunity.findUnique({
      where: { id },
    });
    return opportunities;
  }
  async getAllUserOpportunities() {}
  async createOpportunity(dto: CreateOpportunityDto, id: string) {
    const date = dto.date ? new Date(dto.date) : undefined;
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
        imageUrl: dto.imageUrl,
      },
    });
    return opportunities;
  }
  async updateOpportunity(
    dto: TUpdateOpportunityDto,
    userId: string,
    id: string,
  ) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id, userId },
    });
    if (!opportunity) {
      throw new BadRequestException(AppErrors.OPPORTUNITY_NOT_FOUND);
    }

    const newOpportunity = await this.prisma.opportunity.update({
      where: { id, userId },
      data: { ...dto },
    });

    return newOpportunity;
  }
  async deleteOpportunity(userId: string, id: string) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id, userId },
    });

    if (!opportunity) {
      throw new BadRequestException(AppErrors.OPPORTUNITY_NOT_FOUND);
    }

    await this.prisma.opportunity.delete({
      where: { id, userId },
    });
  }
}
