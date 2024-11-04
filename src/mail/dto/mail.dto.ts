import { ApiProperty } from '@nestjs/swagger';

export class SendClassroomReportDto {
  @ApiProperty({
    example: 'educator@example.com',
    description: 'Correo electrónico del educador que recibirá el reporte del salón',
  })
  email: string;

  @ApiProperty({
    example: 1,
    description: 'ID del salón del cual se generará el reporte',
  })
  salonId: number;
}
