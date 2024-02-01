import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Department } from './employee.types';

@ObjectType('EmployeeDto', { description: 'Employee dto' })
export class EmployeeDTO {
  @Field(() => ID)
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  department: Department;

  @Field()
  title: string;

  @Field()
  salary: number;

  @Field()
  date_of_birth?: Date;

  @Field()
  date_of_joining: Date;
}
