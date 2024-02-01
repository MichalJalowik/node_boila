import { Resolver } from '@nestjs/graphql';
import { Employee } from './employee.model';
import { EmployeeDTO } from './employee.dto';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';

@Resolver(() => EmployeeDTO)
export class EmployeeResolver extends CRUDResolver(EmployeeDTO) {
  constructor(
    @InjectQueryService(Employee)
    readonly service: QueryService<EmployeeDTO>,
  ) {
    super(service);
  }
}
