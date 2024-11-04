import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/evaluation.dto';

@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body() data: CreateEvaluationDto) {
    return this.evaluationService.create(data);
  }

  @Get()
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: number) {
    return this.evaluationService.findByStudent(+studentId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.evaluationService.delete(+id);
  }

  @Get('student/:studentId/results')
  findEvaluationsWithResults(@Param('studentId') studentId: number) {
    return this.evaluationService.findEvaluationsWithResultsByStudent(+studentId);
  }
}
