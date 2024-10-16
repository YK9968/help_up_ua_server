import { Module } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService, PrismaService],
})
export class OpportunitiesModule {}
