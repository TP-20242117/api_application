import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStroopResultDto, CreateCPTResultDto, CreateSSTResultDto } from './dto/result.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';

@Injectable()
export class ResultService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  constructor(private prisma: PrismaService) {}

  async createStroopResult(data: CreateStroopResultDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Stroop result created successfully';
      this.resp.statusCode = 201;

      const result = await this.prisma.stroopResult.create({ data });
      this.resp.data = result;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findStroopResultsByEvaluation(evaluationId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Stroop results retrieved successfully';
      this.resp.statusCode = 200;

      const results = await this.prisma.stroopResult.findMany({ where: { evaluationId } });
      this.resp.data = results;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async createCPTResult(data: CreateCPTResultDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'CPT result created successfully';
      this.resp.statusCode = 201;

      const result = await this.prisma.cPTResult.create({ data });
      this.resp.data = result;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findCPTResultsByEvaluation(evaluationId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'CPT results retrieved successfully';
      this.resp.statusCode = 200;

      const results = await this.prisma.cPTResult.findMany({ where: { evaluationId } });
      this.resp.data = results;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async createSSTResult(data: CreateSSTResultDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'SST result created successfully';
      this.resp.statusCode = 201;

      const result = await this.prisma.sSTResult.create({ data });
      this.resp.data = result;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findSSTResultsByEvaluation(evaluationId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'SST results retrieved successfully';
      this.resp.statusCode = 200;

      const results = await this.prisma.sSTResult.findMany({ where: { evaluationId } });
      this.resp.data = results;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }
}
