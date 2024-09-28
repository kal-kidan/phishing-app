import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PhishingAttemptModule } from './modules/phishing-attempt/phishing-attempt.module';

import { EmployeeModule } from './modules/employee/employee.module';
import { SeederModule } from './modules/seeder/seeder.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/backend'),
    UsersModule,
    PhishingAttemptModule,
    EmployeeModule,
    SeederModule,
    AuthModule,
  ],
})
export class AppModule {}
