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

      let reportHtml = `
      <h2>Reporte de Evaluaciones del Salón</h2>
      <p>Estimado docente,</p>
      <p>A continuación, encontrará el resumen de las evaluaciones realizadas a los estudiantes de su salón:</p>
    `;

    students.forEach((student) => {
      reportHtml += `
        <h3>Estudiante: ${student.name} | Edad: ${student.age}</h3>
        <ul>
      `;

      student.evaluations.forEach((evaluation) => {
        const stroop = evaluation.stroopResults.map(result => `
          <li><strong>Stroop:</strong> Tiempo de respuesta promedio: ${result.averageResponseTime} ms, Aciertos: ${result.correctAnswers}, Errores: ${result.incorrectAnswers}</li>
        `).join('');

        const cpt = evaluation.cptResults.map(result => `
          <li><strong>CPT:</strong> Tiempo de reacción promedio: ${result.averageResponseTime} ms, Errores de omisión: ${result.omissionErrors}, Errores de comisión: ${result.commissionErrors}</li>
        `).join('');

        const sst = evaluation.sstResults.map(result => `
          <li><strong>SST:</strong> Tiempo de reacción promedio: ${result.averageResponseTime} ms, Paradas correctas: ${result.correctStops}, Paradas incorrectas: ${result.incorrectStops}, Flechas ignoradas: ${result.ignoredArrows}</li>
        `).join('');

        reportHtml += `
          <li><strong>Evaluación:</strong> Tipo: ${evaluation.type} | Fecha: ${new Date(evaluation.date).toLocaleDateString('es-PE')}</li>
          <ul>
            ${stroop}
            ${cpt}
            ${sst}
          </ul>
        `;
      });

      reportHtml += `
        </ul>
        <hr />
      `;
    });

    reportHtml += `
      <p>Este reporte es generado automáticamente por la plataforma de evaluaciones cognitivas.</p>
      <p><strong>Atentamente,<br/>Equipo de Evaluaciones</strong></p>
    `;

    const mailOptions = {
      from: `"Evaluaciones Cognitivas" <${emailUser}>`,
      to: email,
      subject: 'Reporte del Salón - Resultados de Evaluaciones',
      html: reportHtml,
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
