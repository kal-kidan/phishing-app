import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: Role, default: [Role.Admin] })
  roles: Role[];
  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
