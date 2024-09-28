import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EmployeeService } from '../employee/employee.service';

import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UsersService,
    private readonly employeeService: EmployeeService,
  ) {}

  async seed() {
    console.log('Seeding database...');

    const adminUser = await this.userService.createUser({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123!',
      roles: ['admin'],
    });

    console.log(`Created admin user: ${adminUser.email}`);

    for (let i = 0; i < 10; i++) {
      const name = i === 0 ? 'Kalkidan' : faker.person.fullName();
      const userEmail =
        i === 0 ? 'kalkidant05@gmail.com' : faker.internet.email();

      const newUser = await this.userService.createUser({
        name,
        email: userEmail,
        password: 'Password123!',
        roles: ['user'],
      });

      const newEmployee = await this.employeeService.createEmployee({
        userId: newUser._id,
        phoneNumber: faker.phone.number(),
        department: faker.commerce.department(),
        jobTitle: faker.person.jobTitle(),
      });

      console.log(
        `Created user: ${newUser.email} and employee: ${newEmployee.jobTitle}`,
      );
    }

    console.log('Seeding completed.');
  }
}
