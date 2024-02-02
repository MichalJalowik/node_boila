import { MigrationInterface, QueryRunner } from 'typeorm';
import { Employee } from '../employee/employee.model';
import { Department, EmployeeType } from '../employee/employee.types';

const dataEmployeeSeed: EmployeeType[] = [
  {
    firstname: 'John',
    lastname: 'Mahoney',
    department: Department.ENG,
    title: 'Owner',
    salary: 1,
    date_of_birth: new Date('2000-09-29T00:00:00Z'),
    date_of_joining: new Date('2023-09-29T08:00:00Z'),
  },
  {
    firstname: 'Patrick',
    lastname: 'McJohny',
    department: Department.FIN,
    title: 'Owner',
    salary: 1,
    date_of_birth: new Date('1989-09-28T00:00:00Z'),
    date_of_joining: new Date('2020-09-20T08:00:00Z'),
  },
];

export class EmployeeSeed1706740251987 implements MigrationInterface {
  name = 'EmployeeSeed1706740251987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const employeeRepo = queryRunner.manager.getRepository<Employee>(Employee);
    for (const employee of dataEmployeeSeed) {
      employeeRepo.save(employee);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const employeeRepo = queryRunner.manager.getRepository<Employee>(Employee);
    for (const employee of dataEmployeeSeed) {
      const match = await employeeRepo.find({
        where: {
          firstname: employee.firstname,
          lastname: employee.lastname,
          date_of_birth: employee.date_of_birth,
        },
      });
      await employeeRepo.remove(match);
    }
  }
}
