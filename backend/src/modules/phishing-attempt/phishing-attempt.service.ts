import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';
import { EmployeeService } from '../employee/employee.service';
import { v5 as uuidv5 } from 'uuid';

@Injectable()
export class PhishingAttemptService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingModel: Model<PhishingAttemptDocument>,
    private employeeService: EmployeeService,
  ) {}

  private generateEmployeeUUID(email: string): string {
    const NAMESPACE = '123e4567-e89b-12d3-a456-426614174000';
    const uniqueData = `${email}-${new Date().toISOString()}`;
    const uuid = uuidv5(uniqueData, NAMESPACE);
    return uuid;
  }

  private generateUniqueLink(email: string) {
    const baseUrl = 'http://localhost:3000/phishing/attempt';
    const encodedData = this.generateEmployeeUUID(email);
    return {
      uniqueLink: `${baseUrl}?token=${encodedData}`,
      token: encodedData,
    };
  }

  async sendPhishingEmail(employeeEmail: string): Promise<PhishingAttempt> {
    const employee = await this.employeeService.findByEmail(employeeEmail);
    if (!employee) {
      throw new BadRequestException(
        "Email doesn't belong to this organization",
      );
    }
    const { uniqueLink, token } = this.generateUniqueLink(employeeEmail);

    const fullEmailContent = `Click <a href="${uniqueLink}">here</a> to see the latest events in your company.`;

    const mailOptions = {
      from: 'email@company.com',
      to: employeeEmail,
      subject: 'You are invited to participate on this company event.',
      html: fullEmailContent,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);

    const phishingAttempt = new this.phishingModel({
      employeeEmail,
      employeeId: employee._id,
      token,
      emailContent: fullEmailContent,
      uniqueLink,
      status: 'Pending',
      createdAt: new Date(),
    });

    return phishingAttempt.save();
  }
  async updateAttemptStatus(encodedData: string): Promise<PhishingAttempt> {
    const attempt = await this.phishingModel.findOne({
      token: encodedData,
    });

    if (!attempt) {
      throw new NotFoundException('Phishing attempt not found');
    }

    return this.phishingModel.findByIdAndUpdate(
      attempt._id,
      { status: 'Clicked', clickedAt: new Date() },
      { new: true },
    );
  }

  async getPhishingAttempts(): Promise<PhishingAttempt[]> {
    return this.phishingModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'employeeId',
        populate: { path: 'userId' },
      })
      .exec();
  }
}
