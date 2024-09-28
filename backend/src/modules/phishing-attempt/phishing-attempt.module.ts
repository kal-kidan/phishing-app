import { Module } from '@nestjs/common';
import { PhishingAttemptController } from './phishing-attempt.controller';
import { PhishingAttemptService } from './phishing-attempt.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schemas/phishing-attempt.schema';
import { UsersModule } from '../users/users.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    UsersModule,
    EmployeeModule,
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  controllers: [PhishingAttemptController],
  providers: [PhishingAttemptService],
})
export class PhishingAttemptModule {}
