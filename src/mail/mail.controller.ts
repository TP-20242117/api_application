import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { SendClassroomReportDto } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-classroom-report')
  @ApiOperation({ summary: 'Enviar un reporte de evaluaciones de los estudiantes del salón' })
  @ApiBody({ type: SendClassroomReportDto, description: 'Información necesaria para enviar el reporte del salón' })
  sendClassroomReport(@Body() sendClassroomReportDto: SendClassroomReportDto) {
    const { email, salonId } = sendClassroomReportDto;
    return this.mailService.sendClassroomReport(email, salonId);
  }

}
