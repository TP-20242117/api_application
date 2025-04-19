import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ResponseScheme } from 'src/common/interface/response.interface';


@Injectable()
export class FeedbackService {
  public resp: ResponseScheme = {
      error: false,
      message: '',
      statusCode: 200,
      data: {},
    };

    constructor(private prisma: PrismaService) {}
  async create(data: CreateFeedbackDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Feedback created successfully';
      this.resp.statusCode = 201;

      const feedback = await this.prisma.feedback.create({ data });
      this.resp.data = feedback;
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
      this.resp.message = 'Feedbacks retrieved successfully';
      this.resp.statusCode = 200;

      const feedbacks = await this.prisma.feedback.findMany({
        where : { deleted_at: null },
      });
      this.resp.data = feedbacks;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async findOne(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.statusCode = 200;
      this.resp.message = 'Feedback retrieved successfully';

      const feedback = await this.prisma.feedback.findUnique({
        where: { id },
      });

      if (!feedback || feedback.deleted_at !== null) {
        throw new BadRequestException('Feedback not found or is inactive');
      }

      this.resp.data = feedback;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async update(id: number, data: UpdateFeedbackDto) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Feedback updated successfully';
      this.resp.statusCode = 200;

      const existingFeedback = await this.prisma.feedback.findUnique({
        where: { id },
      });
      if (!existingFeedback || existingFeedback.deleted_at !== null) {
        throw new BadRequestException('Student not found or is inactive');
      }

      const updatedFeedback = await this.prisma.feedback.update({
        where: { id },
        data,
      });
      this.resp.data = updatedFeedback;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }

  async remove(id: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Feedback deleted successfully';
      this.resp.statusCode = 200;

      await this.prisma.feedback.update({
        where: { id },
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
