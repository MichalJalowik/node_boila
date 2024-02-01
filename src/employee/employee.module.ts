import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Employee } from './employee.model';
import { join } from 'path';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forFeature([Employee]),
  ],
  providers: [EmployeeResolver, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
