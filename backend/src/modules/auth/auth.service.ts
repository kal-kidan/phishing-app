import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/user.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      roles: user.roles,
    };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    const accessToken = this.jwtService.sign(payload);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(user._id, hashedRefreshToken);

    return {
      refreshToken,
      accessToken,
      user: {
        email: user.email,
        id: user._id,
        roles: user.roles,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async register(userData: CreateUserDto) {
    const user = await this.usersService.createUser(userData);
    return this.login(user);
  }

  async getUserFromRefreshToken(refreshToken: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.usersService.findOneById(payload.sub);

      if (
        !user ||
        !(await bcrypt.compare(refreshToken, user.refreshToken || ''))
      ) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
