import { Injectable } from '@nestjs/common';
import { PrismaService} from '../prisma/prisma.service';
import { UpdateEducatorDto } from './dto/educator.dto';

@Injectable()
export class EducatorService {
    constructor(private prisma: PrismaService) {}

    async getAllEducator() {
        return this.prisma.educator.findMany();
    }

    async getEducator(id: number) {
        return this.prisma.educator.findUnique({ where: { id } });
    }

    async updateEducator(id: number, data: UpdateEducatorDto) {
        return this.prisma.educator.update({ where: { id }, data });
    }

    async deleteEducator(id: number) {
        return this.prisma.educator.delete({ where: { id } });
    }

}
