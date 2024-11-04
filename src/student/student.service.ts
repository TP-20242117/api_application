import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto, UploadStudentsArrayDto } from './dto/student.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';

@Injectable()
export class StudentService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Student created successfully';
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

  async findAll() {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Students retrieved successfully';
      this.resp.statusCode = 200;

      const students = await this.prisma.student.findMany();
      this.resp.data = students;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findById(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.statusCode = 200;
      this.resp.message = 'Student retrieved successfully';

      const student = await this.prisma.student.findUnique({ where: { id } });
      if (!student) throw new BadRequestException('Student not found');

      this.resp.data = student;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async update(id: number, data: UpdateStudentDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Student updated successfully';
      this.resp.statusCode = 200;

      const updatedStudent = await this.prisma.student.update({
        where: { id },
        data,
      });
      this.resp.data = updatedStudent;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async delete(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Student deleted successfully';
      this.resp.statusCode = 200;

      await this.prisma.student.delete({ where: { id } });
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async uploadStudentsArray(data: UploadStudentsArrayDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Students uploaded successfully';
      this.resp.statusCode = 201;

      const { students } = data;
      const validStudents = students.map(student => ({
        name: student.name,
        password: student.password,
        age: student.age,
        salonId: student.salonId,
      }));

      const result = await this.prisma.student.createMany({ data: validStudents });
      this.resp.data = result;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findAllStudentsWithEvaluations() {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Students with evaluations retrieved successfully';
      this.resp.statusCode = 200;

      const studentsWithEvaluations = await this.prisma.student.findMany({
        include: {
          evaluations: {
            include: {
              stroopResults: true,
              cptResults: true,
              sstResults: true,
            },
          },
        },
      });
      this.resp.data = studentsWithEvaluations;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }
}
