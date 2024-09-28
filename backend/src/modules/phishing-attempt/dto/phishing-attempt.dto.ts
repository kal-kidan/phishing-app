import { IsNotEmpty, IsString } from 'class-validator';

export class SendPhishingEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
