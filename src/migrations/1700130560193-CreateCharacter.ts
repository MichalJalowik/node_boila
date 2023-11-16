import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCharacter1700130560193 implements MigrationInterface {
  name = 'CreateCharacter1700130560193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "character" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "episodes" text array NOT NULL DEFAULT '{}', "planet" text, CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "character"`);
  }
}
