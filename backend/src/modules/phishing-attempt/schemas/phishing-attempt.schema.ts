import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Employee } from '../../employee/schemas/employee.schema';

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema()
export class PhishingAttempt {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  })
  employeeId: Employee;

  @Prop({ required: true })
  emailContent: string;

  @Prop({ required: true })
  uniqueLink: string;
  @Prop({ required: true })
  token: string;

  @Prop({
    required: true,
    enum: ['Pending', 'Clicked', 'Ignored'],
    default: 'Pending',
  })
  status: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  clickedAt?: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
