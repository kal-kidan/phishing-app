import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  jobTitle: string;
}
