export class CreateStroopResultDto {
    evaluationId: number;
    averageResponseTime: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }
  
  export class CreateCPTResultDto {
    evaluationId: number;
    averageResponseTime: number;
    omissionErrors: number;
    commissionErrors: number;
  }
  
  export class CreateSSTResultDto {
    evaluationId: number;
    averageResponseTime: number;
    correctStops: number;
    incorrectStops: number;
    ignoredArrows: number;
  }
  