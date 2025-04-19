import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  rating: number;

  @ApiPropertyOptional({ example: "Muy buen desempeño." })
  comment?: string;

  @ApiPropertyOptional({ example: 3 })
  studentId?: number;

  @ApiPropertyOptional({ example: 2 })
  educatorId?: number;
  }
