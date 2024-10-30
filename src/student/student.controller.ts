import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateStudentDto, UpdateStudentDto, UploadStudentsArrayDto } from './dto/student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiBody({ type: CreateStudentDto })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.studentService.findById(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateStudentDto })
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.studentService.delete(id);
  }

  @Post('upload-array')
  uploadStudentsArray(@Body() data: UploadStudentsArrayDto) {
    return this.studentService.uploadStudentsArray(data);
  }
}
