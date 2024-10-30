import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStroopResultDto, CreateCPTResultDto, CreateSSTResultDto } from './dto/result.dto';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) {}

  async createStroopResult(data: CreateStroopResultDto) {
    return this.prisma.stroopResult.create({ data });
  }

  async findStroopResultsByEvaluation(evaluationId: number) {
    return this.prisma.stroopResult.findMany({ where: { evaluationId } });
  }

  async createCPTResult(data: CreateCPTResultDto) {
    return this.prisma.cPTResult.create({ data });
  }

  async findCPTResultsByEvaluation(evaluationId: number) {
    return this.prisma.cPTResult.findMany({ where: { evaluationId } });
  }

  async createSSTResult(data: CreateSSTResultDto) {
    return this.prisma.sSTResult.create({ data });
  }

  async findSSTResultsByEvaluation(evaluationId: number) {
    return this.prisma.sSTResult.findMany({ where: { evaluationId } });
  }
}
