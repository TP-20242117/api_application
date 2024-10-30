import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty({
    description: 'The name of the classroom',
    example: 'Math 101',
  })
  name: string;

  @ApiProperty({
    description: 'The ID of the educator associated with the classroom',
    example: 1,
  })
  educatorId: number;
}

export class UpdateClassroomDto {
  @ApiPropertyOptional({
    description: 'The updated name of the classroom',
    example: 'Science 102',
  })
  name?: string;
}