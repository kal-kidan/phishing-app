import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/employee.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private userService: UsersService,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async getEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().populate('userId', 'name email').exec();
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.userService.findOne(email);
    return this.employeeModel.findOne({ userId: user._id }).lean().exec();
  }
}
