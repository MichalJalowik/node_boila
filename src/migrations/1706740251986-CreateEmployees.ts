import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployees1706740251986 implements MigrationInterface {
  name = 'CreateEmployees1706740251986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" BIGSERIAL NOT NULL, "firstname" text NOT NULL, "lastname" text NOT NULL, "department" text NOT NULL, "title" text NOT NULL, "salary" bigint NOT NULL, "date_of_birth" TIMESTAMP WITH TIME ZONE, "date_of_joining" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
