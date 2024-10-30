import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EducatorModule } from './educator/educator.module';
import { StudentModule } from './student/student.module';
import { ClassroomModule } from './classroom/classroom.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ResultModule } from './result/result.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, EducatorModule, StudentModule, ClassroomModule, EvaluationModule, ResultModule, MailModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
