import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Factory, getFactory } from '../utils/factoryGirl';
import { Employee } from './employee.model';
import * as GqlQueries from '../utils/testingGraphQLQueries';
import { EmployeeDTO } from './employee.dto';
import { Department } from './employee.types';

type CrudResponseEdges = {
  node: EmployeeDTO;
  cursor: string;
};

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
    await source.createQueryRunner().query('TRUNCATE employee;');
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

  it('correctly updates one employee', async () => {
    const { id } = await factory.create<Employee>('Employee', {
      lastname: 'White',
    });

    const query = {
      query: GqlQueries.updateEmployee,
      variables: { id },
    };

    await request(app.getHttpServer()).post('/graphql').send(query).expect(200);

    const updatedEmployee = await source.manager.findOne<Employee>(Employee, {
      where: { id },
    });
    expect(updatedEmployee?.lastname).toEqual('Black');
  });

  it('correctly updates one employee', async () => {
    const { id } = await factory.create<Employee>('Employee', {
      lastname: 'White',
    });

    const query = {
      query: GqlQueries.updateEmployee,
      variables: { id },
    };

    await request(app.getHttpServer()).post('/graphql').send(query).expect(200);

    const updatedEmployee = await source.manager.findOne<Employee>(Employee, {
      where: { id },
    });
    expect(updatedEmployee?.lastname).toEqual('Black');
  });

  it('correctly recieved asked employees details', async () => {
    const { id } = await factory.create<Employee>('Employee');

    const query = {
      query: GqlQueries.employeeDetails,
      variables: { id },
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const responseEmployee = response.body.data['employee'] as EmployeeDTO;
    expect(responseEmployee.id).toBeDefined();
    expect(responseEmployee.firstname).toBeDefined();
    expect(responseEmployee.lastname).toBeDefined();
    expect(responseEmployee.salary).toBeDefined();
    expect(responseEmployee.title).toBeDefined();
    expect(responseEmployee.department).toBeDefined();
    expect(responseEmployee.date_of_birth).toBeDefined();
    expect(responseEmployee.date_of_joining).toBeDefined();
    expect(responseEmployee.updated_at).toBeDefined();
    expect(responseEmployee.created_at).toBeDefined();
  });

  it('correctly recieved employees list', async () => {
    const query = {
      query: GqlQueries.employeesList,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const responseEmployees = response.body.data['employees'][
      'edges'
    ] as Record<string, any>[];
    const countDbEmployees = await source.manager.count(Employee);
    expect(responseEmployees.length).toEqual(countDbEmployees);
  });

  it('corectly sort employees by joining day and salary', async () => {
    await source.createQueryRunner().query('TRUNCATE employee;');
    const [
      { id },
      { id: id1 },
      { id: id2 },
      { id: id3 },
      { id: id4 },
      { id: id5 },
      { id: id6 },
      { id: id7 },
      { id: id8 },
    ] = await factory.createMany<Employee>('Employee', [
      { date_of_joining: new Date(2020, 1), salary: 1000 },
      { date_of_joining: new Date(2020, 1), salary: 1100 },
      { date_of_joining: new Date(2020, 1), salary: 1200 },
      { date_of_joining: new Date(2023, 1), salary: 2000 },
      { date_of_joining: new Date(2023, 1), salary: 2100 },
      { date_of_joining: new Date(2023, 1), salary: 2200 },
      { date_of_joining: new Date(2013, 1), salary: 3000 },
      { date_of_joining: new Date(2013, 1), salary: 3100 },
      { date_of_joining: new Date(2013, 1), salary: 3200 },
    ]);

    const correctSortOrder = [id5, id4, id3, id2, id1, id, id8, id7, id6];

    const query = {
      query: GqlQueries.employeesSortedByJoinningDayAndSalary,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const responseEmployees = response.body.data['employees'][
      'edges'
    ] as CrudResponseEdges[];

    const recievedSortOrder = responseEmployees.map((r) => r.node.id);
    expect(correctSortOrder).toEqual(recievedSortOrder);
  });

  it('corectly filter employees by salary range', async () => {
    await source.createQueryRunner().query('TRUNCATE employee;');

    await factory.createMany<Employee>('Employee', [
      { salary: 100 },
      { salary: 1000 },
      { salary: 1200 },
      { salary: 2000 },
      { salary: 2100 },
    ]);

    const query = {
      query: GqlQueries.filterEmployeesBySalaryRange,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const responseEmployees = response.body.data['employees'][
      'edges'
    ] as CrudResponseEdges[];

    const recievedSalaries = responseEmployees.map((r) => r.node.salary);
    expect(recievedSalaries).toEqual(
      expect.arrayContaining([2000, 1000, 1200]),
    );
    expect(recievedSalaries).not.toEqual(expect.arrayContaining([100, 2100]));
  });

  it('corectly filter employees by department', async () => {
    await source.createQueryRunner().query('TRUNCATE employee;');

    await factory.createMany<Employee>('Employee', [
      { department: Department.FIN },
      { department: Department.ENG },
      { department: Department.FIN },
      { department: Department.HR },
    ]);

    const query = {
      query: GqlQueries.filterEmployeesByDepartment,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const responseEmployees = response.body.data['employees'][
      'edges'
    ] as CrudResponseEdges[];

    const recievedDepts = responseEmployees.filter(
      (f) => f.node.department === Department.FIN,
    );
    expect(recievedDepts.length).toEqual(2);
  });

  it('corectly filter employees by title', async () => {
    await source.createQueryRunner().query('TRUNCATE employee;');

    await factory.createMany<Employee>('Employee', [
      { title: 'Manager' },
      { title: 'Specialist' },
      { title: 'Engineer' },
      { title: 'Manager' },
    ]);

    const query = {
      query: GqlQueries.filterEmployeesByTitle,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    const responseEmployees = response.body.data['employees'][
      'edges'
    ] as CrudResponseEdges[];

    const recievedDepts = responseEmployees.filter(
      (f) => f.node.title === 'Manager',
    );
    expect(recievedDepts.length).toEqual(2);
  });
});
