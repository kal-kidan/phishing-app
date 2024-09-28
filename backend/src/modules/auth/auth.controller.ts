import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }
  @Post('refresh')
  async refreshTokens(@Body() token: RefreshTokenDto) {
    const user = await this.authService.getUserFromRefreshToken(
      token.refreshToken,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.authService.login(user);
  }
}
