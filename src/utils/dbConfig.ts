import { DataSource, DataSourceOptions } from 'typeorm';

export const getDbConfig = (runMigrations?: boolean): DataSourceOptions => ({
  host: process.env.DB_HOST,
  type: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: runMigrations ? true : undefined,
  synchronize: false,
});

export async function runMigrations() {
  new DataSource({
    ...getDbConfig(true),
    logging: 'all',
  });

  // try {
  //   connection = await connection.initialize();
  //   console.log(`Established connection with db: ${DataSource.name}`);

  //   await connection.runMigrations({
  //     transaction: 'all',
  //   });
  //   console.log('Finished running migrations');
  // } catch (error) {
  //   console.error('run migrations error', error);
  // } finally {
  //   console.log('Finally run migrations');
  //   await connection.destroy();
  // }
}
