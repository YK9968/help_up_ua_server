import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateOpportunityDto,
  UpdateOpportunityDto,
} from './dto/createOpportunity.dto';
import { PrismaService } from 'prisma.service';
import { Opportunity } from '@prisma/client';
import { AppErrors } from 'src/errors';

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

  async getAllOpportunities(): Promise<Opportunity[]> {
    const opportunities = await this.prisma.opportunity.findMany();
    return opportunities;
  }

  async getOpportunityById(id: string): Promise<Opportunity> {
    const opportunities = await this.findOpportunity(id);
    return opportunities;
  }

  async getUserOpportunities(userId: string): Promise<Opportunity[]> {
    const opportunities = await this.prisma.opportunity.findMany({
      where: { userId },
    });

    return opportunities;
  }

  async createOpportunity(
    dto: CreateOpportunityDto,
    id: string,
  ): Promise<Opportunity> {
    const date = dto.date ? new Date(dto.date) : undefined;
    const imageUrl = dto.imageUrl || null;
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
    await this.findOpportunity(id, userId);

    const opportunity = await this.prisma.opportunity.update({
      where: { id, userId },
      data: { ...dto },
    });

    return opportunity;
  }
  async deleteOpportunity(userId: string, id: string): Promise<void> {
    await this.findOpportunity(id, userId);

    await this.prisma.opportunity.delete({
      where: { id, userId },
    });
  }
}
