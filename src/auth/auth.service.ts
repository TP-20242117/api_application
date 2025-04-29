import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterEducatorDto, RegisterStudentDto, LoginEducatorDto, LoginStudentDto } from './dto/auth.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';

@Injectable()
export class AuthService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  constructor(private prisma: PrismaService) {}

  async registerEducator(data: RegisterEducatorDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Educator registered successfully';
      this.resp.statusCode = 201;
      
      const educator = await this.prisma.educator.create({ data });
      this.resp.data = educator;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async registerStudent(data: RegisterStudentDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Student registered successfully';
      this.resp.statusCode = 201;
      
      const student = await this.prisma.student.create({ data });
      this.resp.data = student;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async loginEducator(data: LoginEducatorDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.statusCode = 200;

      const educator = await this.prisma.educator.findFirst({
        where: { email: data.email, password: data.password },
      });

      if (!educator) throw new BadRequestException('Invalid credentials');

      this.resp.data = educator;
      this.resp.message = 'Educator logged in successfully';
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 401;
    }
    return this.resp;
  }

  async loginStudent(data: LoginStudentDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.statusCode = 200;

      const student = await this.prisma.student.findFirst({
        where: { name: data.name, password: data.password },
      });

      if (!student) throw new BadRequestException('Invalid credentials');

      this.resp.data = student;
      this.resp.message = 'Student logged in successfully';
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 401;
    }
    return this.resp;
  }
}
