import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEducatorDto } from './dto/educator.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';

@Injectable()
export class EducatorService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  constructor(private prisma: PrismaService) {}

  async getAllEducator() {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Educators retrieved successfully';
      this.resp.statusCode = 200;

      const educators = await this.prisma.educator.findMany({
        where: { deleted_at: null },
      });
      this.resp.data = educators;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async getEducator(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.statusCode = 200;
      this.resp.message = 'Educator retrieved successfully';

      const educator = await this.prisma.educator.findUnique({
        where: { id, deleted_at: null },
      });
      if (!educator) throw new BadRequestException('Educator not found');

      this.resp.data = educator;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async updateEducator(id: number, data: UpdateEducatorDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Educator updated successfully';
      this.resp.statusCode = 200;

      const updatedEducator = await this.prisma.educator.update({
        where: { id, deleted_at: null }, 
        data,
      });
      this.resp.data = updatedEducator;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async deleteEducator(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Educator deleted successfully';
      this.resp.statusCode = 200;

      await this.prisma.educator.update({
        where: { id },
        data: {
          deleted_at: new Date(),
        },
      });

      await this.prisma.salon.updateMany({
        where: { educatorId: id },
        data: {
          deleted_at: new Date(),
        },
      });

    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }
}
