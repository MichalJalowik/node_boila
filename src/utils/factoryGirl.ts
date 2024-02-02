import { DataSource } from 'typeorm';
import { factory } from 'factory-girl';
import {
  randLastName,
  randNumber,
  randPastDate,
  randPersonTitle,
  randUserName,
} from '@ngneat/falso';
import { CustomTypeORMAdapter } from './customTypeOrmAdapter';
import { Employee } from '../employee/employee.model';
import { Department } from '../employee/employee.types';

export type Factory = typeof factory;

export let factoryCached: Factory;

factory.define('Employee', Employee, {
  firstname: randUserName(),
  lastname: randLastName(),
  department: Department.HR,
  title: randPersonTitle(),
  salary: randNumber({ min: 2, max: 6000 }),
  date_of_birth: randPastDate({ years: 20 }),
  date_of_joining: randPastDate({ years: 3 }),
});

export const getFactory = (datasource: DataSource) => {
  if (!factoryCached) {
    factory.setAdapter(new CustomTypeORMAdapter(datasource));
    factoryCached = factory;
  }
  return factoryCached;
};
