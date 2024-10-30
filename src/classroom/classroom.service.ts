import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClassroomDto) {
    return this.prisma.salon.create({ data });
  }

  async findAll() {
    return this.prisma.salon.findMany();
  }

  async findByEducator(educatorId: number) {
    return this.prisma.salon.findMany({ where: { educatorId } });
  }

  async update(id: number, data: UpdateClassroomDto) {
    return this.prisma.salon.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.salon.delete({ where: { id } });
  }
}
