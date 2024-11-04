import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';

@Injectable()
export class ClassroomService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  constructor(private prisma: PrismaService) {}

  async create(data: CreateClassroomDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Classroom created successfully';
      this.resp.statusCode = 201;

      const classroom = await this.prisma.salon.create({ data });
      this.resp.data = classroom;
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
      this.resp.message = 'Classrooms retrieved successfully';
      this.resp.statusCode = 200;

      const classrooms = await this.prisma.salon.findMany();
      this.resp.data = classrooms;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findByEducator(educatorId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Classrooms retrieved successfully';
      this.resp.statusCode = 200;

      const classrooms = await this.prisma.salon.findMany({
        where: { educatorId },
      });
      this.resp.data = classrooms;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async update(id: number, data: UpdateClassroomDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Classroom updated successfully';
      this.resp.statusCode = 200;

      const updatedClassroom = await this.prisma.salon.update({
        where: { id },
        data,
      });
      this.resp.data = updatedClassroom;
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
      this.resp.message = 'Classroom deleted successfully';
      this.resp.statusCode = 200;

      await this.prisma.salon.delete({ where: { id } });
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }
}
