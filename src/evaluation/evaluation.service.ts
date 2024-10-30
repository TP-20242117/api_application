import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvaluationDto } from './dto/evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEvaluationDto) {
    return this.prisma.evaluation.create({ data });
  }

  async findAll() {
    return this.prisma.evaluation.findMany();
  }

  async findByStudent(studentId: number) {
    return this.prisma.evaluation.findMany({ where: { studentId } });
  }

  async delete(id: number) {
    return this.prisma.evaluation.delete({ where: { id } });
  }

  async findEvaluationsWithResultsByStudent(studentId: number) {
    return this.prisma.evaluation.findMany({
      where: { studentId },
      include: {
        stroopResults: true,
        cptResults: true,
        sstResults: true,
      },
    });
  }
}
