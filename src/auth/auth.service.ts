import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterEducatorDto, RegisterStudentDto, LoginEducatorDto, LoginStudentDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerEducator(data: RegisterEducatorDto) {
    return this.prisma.educator.create({ data });
  }

  async registerStudent(data: RegisterStudentDto) {
    return this.prisma.student.create({ data });
  }

  async loginEducator(data: LoginEducatorDto) {
    return this.prisma.educator.findFirst({
      where: { email: data.email, password: data.password },
    });
  }

  async loginStudent(data: LoginStudentDto) {
    return this.prisma.student.findFirst({
      where: { name: data.name, password: data.password },
    });
  }
}
