import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  jobTitle: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
