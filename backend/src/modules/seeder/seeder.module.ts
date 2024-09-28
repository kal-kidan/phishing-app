import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { EmployeeModule } from '../employee/employee.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, EmployeeModule],
  providers: [SeederService],
})
export class SeederModule {}
