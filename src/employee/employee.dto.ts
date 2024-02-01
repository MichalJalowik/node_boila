import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Department } from './employee.types';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';

@ObjectType('Employee', { description: 'Employee dto' })
export class EmployeeDTO {
  @IDField(() => ID)
  id: number;

  @FilterableField()
  firstname: string;

  @FilterableField()
  lastname: string;

  @FilterableField()
  department: Department;

  @FilterableField()
  title: string;

  @FilterableField()
  salary: number;

  @FilterableField()
  date_of_birth?: Date;

  @FilterableField()
  date_of_joining: Date;

  @Field(() => GraphQLISODateTime)
  created_at: Date;

  @Field(() => GraphQLISODateTime)
  updated_at: Date;
}
