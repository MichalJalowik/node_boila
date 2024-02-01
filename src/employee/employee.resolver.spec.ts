import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Factory, getFactory } from '../utils/factoryGirl';
import { Employee } from './employee.model';
import * as GqlQueries from '../utils/testingGraphQLQueries';

describe('EmployeeResolver', () => {
  let app: INestApplication;
  let source: DataSource;
  let factory: Factory;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
        transform: true,
      }),
    );
    source = testingModule.get<DataSource>(DataSource);
    factory = getFactory(source);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('correctly creates one employee', async () => {
    const totalBefore = await source.manager.count(Employee);
    expect(totalBefore).toEqual(2);

    const query = {
      query: GqlQueries.createEmployee,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const createdEmployeeId = response.body.data.createOneEmployee.id as bigint;

    const totalAfter = await source.manager.count(Employee);
    expect(totalAfter).toEqual(3);

    const newEmployee = await source.manager.findOneOrFail<Employee>(Employee, {
      where: { id: createdEmployeeId },
    });

    expect(newEmployee.id).toEqual(createdEmployeeId);
  });

  it('correctly deletes one employee', async () => {
    const { id } = await factory.create<Employee>('Employee');
    const totalBefore = await source.manager.count(Employee);
    expect(totalBefore).toEqual(4);

    const query = {
      query: GqlQueries.deleteEmployee,
      variables: { id },
    };

    await request(app.getHttpServer()).post('/graphql').send(query).expect(200);

    const totalAfter = await source.manager.count(Employee);
    expect(totalAfter).toEqual(3);

    const deletedEmployee = await source.manager.findOne<Employee>(Employee, {
      where: { id },
    });
    expect(deletedEmployee).toBeNull();
  });
});
