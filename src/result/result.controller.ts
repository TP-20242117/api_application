import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateStroopResultDto, CreateCPTResultDto, CreateSSTResultDto } from './dto/result.dto';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post('stroop')
  createStroopResult(@Body() data: CreateStroopResultDto) {
    return this.resultService.createStroopResult(data);
  }

  @Get('stroop/:evaluationId')
  findStroopResults(@Param('evaluationId') evaluationId: number) {
    return this.resultService.findStroopResultsByEvaluation(+evaluationId);
  }

  @Post('cpt')
  createCPTResult(@Body() data: CreateCPTResultDto) {
    return this.resultService.createCPTResult(data);
  }

  @Get('cpt/:evaluationId')
  findCPTResults(@Param('evaluationId') evaluationId: number) {
    return this.resultService.findCPTResultsByEvaluation(+evaluationId);
  }

  @Post('sst')
  createSSTResult(@Body() data: CreateSSTResultDto) {
    return this.resultService.createSSTResult(data);
  }

  @Get('sst/:evaluationId')
  findSSTResults(@Param('evaluationId') evaluationId: number) {
    return this.resultService.findSSTResultsByEvaluation(+evaluationId);
  }
}
