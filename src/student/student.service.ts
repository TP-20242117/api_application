import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto, UploadStudentsArrayDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    return this.prisma.student.create({ data });
  }

  async findAll() {
    return this.prisma.student.findMany();
  }

  async findById(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateStudentDto) {
    return this.prisma.student.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.student.delete({ where: { id } });
  }

  async uploadStudentsArray(data: UploadStudentsArrayDto) {
    const { students } = data;

    const validStudents = students.map(student => ({
      name: student.name,
      password: student.password,
      age: student.age,
      salonId: student.salonId,
    }));

    return this.prisma.student.createMany({ data: validStudents });
  }
}