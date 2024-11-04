import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {
  @ApiProperty({
    description: 'Estado de la evaluación (in progress o completed)',
    example: 'in progress',
  })
  type: string;

  @ApiProperty({
    description: 'Fecha y hora en que se realizó la evaluación en formato ISO',
    example: '2023-10-10T15:00:00Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Duración de la evaluación en segundos',
    example: 60,
  })
  duration: number;

  @ApiProperty({
    description: 'ID del estudiante que realizó la evaluación',
    example: 1,
  })
  studentId: number;
}