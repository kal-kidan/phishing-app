import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { EmployeeService } from '../employee/employee.service';
import { UsersService } from '../users/users.service';
import { Employee, EmployeeSchema } from '../employee/schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SeederService, EmployeeService, UsersService],
})
export class SeederModule {}
