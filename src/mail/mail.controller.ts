import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendClassroomReportDto } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-classroom-report')
sendClassroomReport(@Body() sendClassroomReportDto: SendClassroomReportDto) {
    const { email, salonId } = sendClassroomReportDto;
    return this.mailService.sendClassroomReport(email, salonId);
}

}
