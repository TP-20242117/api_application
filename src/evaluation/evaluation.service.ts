import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvaluationDto, UpdateEvaluationDto } from './dto/evaluation.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';

@Injectable()
export class EvaluationService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  constructor(private prisma: PrismaService) {}

  async create(data: CreateEvaluationDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Evaluation created successfully';
      this.resp.statusCode = 201;

      const evaluation = await this.prisma.evaluation.create({ data });
      this.resp.data = evaluation;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findAll() {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Evaluations retrieved successfully';
      this.resp.statusCode = 200;

      const evaluations = await this.prisma.evaluation.findMany();
      this.resp.data = evaluations;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findByStudent(studentId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Evaluations by student retrieved successfully';
      this.resp.statusCode = 200;

      const evaluations = await this.prisma.evaluation.findMany({ where: { studentId } });
      this.resp.data = evaluations;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async update(id: number, data: UpdateEvaluationDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Evaluation updated successfully';
      this.resp.statusCode = 200;

      const updatedEvaluation = await this.prisma.evaluation.update({
        where: { id },
        data,
      });
      this.resp.data = updatedEvaluation;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async delete(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Evaluation deleted successfully';
      this.resp.statusCode = 200;

      await this.prisma.evaluation.delete({ where: { id } });
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findEvaluationsWithResultsByStudent(studentId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Evaluations with results retrieved successfully';
      this.resp.statusCode = 200;

      const evaluations = await this.prisma.evaluation.findMany({
        where: { studentId },
        include: {
          stroopResults: true,
          cptResults: true,
          sstResults: true,
        },
      });
      this.resp.data = evaluations;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }
}
