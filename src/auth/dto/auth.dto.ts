import { ApiProperty } from '@nestjs/swagger';

export class RegisterEducatorDto {
  @ApiProperty({ description: 'The name of the educator', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'The email of the educator', example: 'johndoe@example.com' })
  email: string;

  @ApiProperty({ description: 'The password for the educator account', example: 'securePassword123' })
  password: string;
}

export class LoginStudentDto {
  @ApiProperty({ description: 'The name of the student', example: 'Jane Doe' })
  name: string;

  @ApiProperty({ description: 'The password for the student account', example: 'securePassword123' })
  password: string;
}

export class LoginEducatorDto {
  @ApiProperty({ description: 'The email of the educator', example: 'johndoe@example.com' })
  email: string;

  @ApiProperty({ description: 'The password for the educator account', example: 'securePassword123' })
  password: string;
}

export class RegisterStudentDto {
  @ApiProperty({ description: 'The name of the student', example: 'Jane Doe' })
  name: string;

  @ApiProperty({ description: 'The password for the student account', example: 'securePassword123' })
  password: string;

  @ApiProperty({ description: 'The age of the student', example: 16 })
  age: number;

  @ApiProperty({ description: 'The ID of the classroom/salon the student belongs to', example: 1 })
  salonId: number;
}
