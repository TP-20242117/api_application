import { Controller, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { EducatorService } from './educator.service';
import { UpdateEducatorDto } from './dto/educator.dto';

@Controller('educator')
export class EducatorController {
    constructor(private readonly educatorService: EducatorService) {}

    @Get()
    findAll() {
        return this.educatorService.getAllEducator();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.educatorService.getEducator(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() data: UpdateEducatorDto) {
        return this.educatorService.updateEducator(+id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.educatorService.deleteEducator(+id);
    }

}
