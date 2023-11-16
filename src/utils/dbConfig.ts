import { DataSource, DataSourceOptions } from 'typeorm';

function getConfig() {
  if (process.env.NODE_ENV === 'test') {
    return {
      entities: ['src/**/*.model.ts'],
      migrations: ['src/migrations/*.ts'],
    };
  } else {
    return {
      entities: ['dist/**/*.model.js'],
      migrations: ['dist/migrations/*.js'],
    };
  }
}

export const getDbConfig = (runMigrations?: boolean): DataSourceOptions => ({
  host: process.env.DB_HOST,
  type: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB,
  entities: getConfig().entities,
  migrations: getConfig().migrations,
  migrationsRun: runMigrations ? true : undefined,
  synchronize: false,
});

export async function runMigrations() {
  new DataSource({
    ...getDbConfig(true),
    logging: 'all',
  });
}
