import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';

@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  create(@Body() data: CreateClassroomDto) {
    return this.classroomService.create(data);
  }

  @Get()
  findAll() {
    return this.classroomService.findAll();
  }

  @Get('educator/:id')
  findByEducator(@Param('id') educatorId: number) {
    return this.classroomService.findByEducator(educatorId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateClassroomDto) {
    return this.classroomService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.classroomService.delete(id);
  }
}
