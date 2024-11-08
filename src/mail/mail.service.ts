import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseScheme } from 'src/common/interface/response.interface';

const emailPassword = process.env.PASS_EMAIL;
const emailUser = process.env.USER_EMAIL;

@Injectable()
export class MailService {
  public resp: ResponseScheme = {
    error: false,
    message: '',
    statusCode: 200,
    data: {},
  };

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  constructor(private prisma: PrismaService) {}

  async sendClassroomReport(email: string, salonId: number) {
    try {
      this.resp.data = {};
      this.resp.error = false;
      this.resp.message = 'Classroom report sent successfully';
      this.resp.statusCode = 200;

      const students = await this.prisma.student.findMany({
        where: { salonId },
        include: {
          evaluations: {
            include: {
              stroopResults: true,
              cptResults: true,
              sstResults: true,
            },
          },
        },
      });

      const report = students
        .map((student) => {
          const evaluations = student.evaluations
            .map((evaluation) => {
              const stroop = evaluation.stroopResults
                .map(result => `Stroop - Avg Resp Time: ${result.averageResponseTime}, Correct: ${result.correctAnswers}, Incorrect: ${result.incorrectAnswers}`)
                .join('; ');
              const cpt = evaluation.cptResults
                .map(result => `CPT - Avg Resp Time: ${result.averageResponseTime}, Omissions: ${result.omissionErrors}, Commissions: ${result.commissionErrors}`)
                .join('; ');
              const sst = evaluation.sstResults
                .map(result => `SST - Avg Resp Time: ${result.averageResponseTime}, Correct Stops: ${result.correctStops}, Incorrect Stops: ${result.incorrectStops}, Ignored Arrows: ${result.ignoredArrows}`)
                .join('; ');

              return `Evaluation ID: ${evaluation.id}, Type: ${evaluation.type}, Date: ${evaluation.date}\n Results: ${stroop}\n${cpt}\n${sst}`;
            })
            .join('\n');

          return `Student: ${student.name}, Age: ${student.age}\nEvaluations:\n${evaluations}\n\n`;
        })
        .join('\n');

      const mailOptions = {
        from: emailUser,
        to: email,
        subject: 'Reporte del Salón',
        text: report,
      };

      const result = await this.transporter.sendMail(mailOptions);
      this.resp.data = result;
    } catch (error) {
      this.resp.error = true;
      this.resp.message = JSON.stringify(error);
      this.resp.statusCode = 400;
    }
    return this.resp;
  }
}
