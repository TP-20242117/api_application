import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterEducatorDto, RegisterStudentDto, LoginEducatorDto, LoginStudentDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-educator')
  @ApiBody({ type: RegisterEducatorDto, description: 'Registro de un nuevo educador' })
  registerEducator(@Body() data: RegisterEducatorDto) {
    return this.authService.registerEducator(data);
  }

  @Post('register-student')
  @ApiBody({ type: RegisterStudentDto, description: 'Registro de un nuevo estudiante' })
  registerStudent(@Body() data: RegisterStudentDto) {
    return this.authService.registerStudent(data);
  }

  @Post('login-educator')
  @ApiBody({ type: LoginEducatorDto, description: 'Inicio de sesión para educador' })
  loginEducator(@Body() data: LoginEducatorDto) {
    return this.authService.loginEducator(data);
  }

  @Post('login-student')
  @ApiBody({ type: LoginStudentDto, description: 'Inicio de sesión para estudiante' })
  loginStudent(@Body() data: LoginStudentDto) {
    return this.authService.loginStudent(data);
  }
}
