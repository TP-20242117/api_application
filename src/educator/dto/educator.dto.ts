import { ApiProperty } from '@nestjs/swagger';

export class UpdateEducatorDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del educador', required: false })
  name?: string;

  @ApiProperty({ example: 'juanperez@ejemplo.com', description: 'Correo electrónico del educador', required: false })
  email?: string;

  @ApiProperty({ example: 'nuevaContraseña123', description: 'Nueva contraseña del educador', required: false })
  password?: string;
}
