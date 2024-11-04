import { ApiProperty } from '@nestjs/swagger';

export class CreateStroopResultDto {
  @ApiProperty({ example: 1, description: 'ID de la evaluación a la que pertenece el resultado' })
  evaluationId: number;

  @ApiProperty({ example: 500, description: 'Tiempo de respuesta promedio en milisegundos' })
  averageResponseTime: number;

  @ApiProperty({ example: 15, description: 'Número de respuestas correctas' })
  correctAnswers: number;

  @ApiProperty({ example: 3, description: 'Número de respuestas incorrectas' })
  incorrectAnswers: number;
}

export class CreateCPTResultDto {
  @ApiProperty({ example: 1, description: 'ID de la evaluación a la que pertenece el resultado' })
  evaluationId: number;

  @ApiProperty({ example: 450, description: 'Tiempo de reacción promedio en milisegundos' })
  averageResponseTime: number;

  @ApiProperty({ example: 2, description: 'Número de errores de omisión' })
  omissionErrors: number;

  @ApiProperty({ example: 1, description: 'Número de errores de comisión' })
  commissionErrors: number;
}

export class CreateSSTResultDto {
  @ApiProperty({ example: 1, description: 'ID de la evaluación a la que pertenece el resultado' })
  evaluationId: number;

  @ApiProperty({ example: 480, description: 'Tiempo de reacción promedio en milisegundos' })
  averageResponseTime: number;

  @ApiProperty({ example: 10, description: 'Número de paradas correctas' })
  correctStops: number;

  @ApiProperty({ example: 2, description: 'Número de paradas incorrectas' })
  incorrectStops: number;

  @ApiProperty({ example: 1, description: 'Número de flechas ignoradas' })
  ignoredArrows: number;
}
