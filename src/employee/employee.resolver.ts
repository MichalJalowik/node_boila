import { Injectable } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { EmployeeDTO } from './employee.dto';

@Injectable()
@Resolver('employee')
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [EmployeeDTO])
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
