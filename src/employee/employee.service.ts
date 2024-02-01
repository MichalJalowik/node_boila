import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: bigint): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
