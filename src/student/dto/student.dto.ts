import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty({example: 'Juan Perez', description: 'Student Name'})
    name: string;

    @ApiProperty({example: '12345678', description: 'Student Password'})
    password: string;

    @ApiProperty({example: 15, description: 'Student Age'})
    age: number;

    @ApiProperty({example: 1, description: 'Student Classroom'})
    salonId: number;
  }
  
  export class UpdateStudentDto {

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    password?: string;

    @ApiProperty({ required: false })
    age?: number;

    @ApiProperty({ required: false })
    salonId?: number;
  }
  
  export class UploadStudentsArrayDto {
    students: Array<{
      name: string;
      password: string;
      age: number;
      salonId: number;
    }>;
  }
  