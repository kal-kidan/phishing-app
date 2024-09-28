import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  Get,
  Redirect,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PhishingAttemptService } from './phishing-attempt.service';
import { SendPhishingEmailDto } from './dto/phishing-attempt.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../users/schemas/user.schema';

@Controller('phishing')
export class PhishingAttemptController {
  constructor(private readonly phishingService: PhishingAttemptService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('send-email')
  async sendPhishingEmail(@Body() phishingData: SendPhishingEmailDto) {
    return this.phishingService.sendPhishingEmail(phishingData.email);
  }

  @Get('attempt')
  @Redirect('https://www.eventbrite.com/d/ethiopia--addis-ababa/events/', 302)
  async updatePhishingAttemptStatus(@Query('token') token: string) {
    return this.phishingService.updateAttemptStatus(token);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('attempts')
  async getAllPhishingAttempts() {
    return this.phishingService.getPhishingAttempts();
  }
}
