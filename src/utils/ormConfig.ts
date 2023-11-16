import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { getDbConfig } from './dbConfig';

export const AppDataSource = new DataSource({
  ...getDbConfig(),
});
