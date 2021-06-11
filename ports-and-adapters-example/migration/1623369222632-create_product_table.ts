import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductTable1623369222632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "products" (
        "id"	TEXT UNIQUE,
        "name"	TEXT NOT NULL,
        "status"	TEXT,
        "price"	REAL,
        PRIMARY KEY("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP table products`);
  }
}
