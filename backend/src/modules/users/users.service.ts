import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto): Promise<any> {
    const existingUser = await this.findOne(userDto.email);
    if (existingUser) {
      throw new BadRequestException('User already exist for this email.');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: refreshToken,
    });
  }
  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });
  }

  async countUsers(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}
