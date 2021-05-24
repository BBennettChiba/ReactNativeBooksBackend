import {MigrationInterface, QueryRunner} from "typeorm";

export class new1621857486913 implements MigrationInterface {
    name = 'new1621857486913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("title" character varying NOT NULL, "isbn" character varying NOT NULL, "coverURL" character varying NOT NULL, "language" character varying NOT NULL, "pageCount" integer NOT NULL, "publisher" character varying NOT NULL, "publishedDate" character varying NOT NULL, "description" character varying NOT NULL, "categories" text array NOT NULL, "authors" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd183604b9c828c0bdd92cafab7" PRIMARY KEY ("isbn"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_owned_books_book" ("userId" character varying NOT NULL, "bookIsbn" character varying NOT NULL, CONSTRAINT "PK_da53dd47614d650d182d7a71fdd" PRIMARY KEY ("userId", "bookIsbn"))`);
        await queryRunner.query(`CREATE INDEX "IDX_70dc0e962f8a53d90b67e6d71a" ON "user_owned_books_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d4862021ab7be9718f357df42" ON "user_owned_books_book" ("bookIsbn") `);
        await queryRunner.query(`CREATE TABLE "user_books_to_read_book" ("userId" character varying NOT NULL, "bookIsbn" character varying NOT NULL, CONSTRAINT "PK_81347fa8a1f1fc6ee5bbf23dccc" PRIMARY KEY ("userId", "bookIsbn"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89faad163c9aa6e3faa0ba3da4" ON "user_books_to_read_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5464f3c1e27f251e84d0e385ec" ON "user_books_to_read_book" ("bookIsbn") `);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD CONSTRAINT "FK_70dc0e962f8a53d90b67e6d71ad" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD CONSTRAINT "FK_6d4862021ab7be9718f357df422" FOREIGN KEY ("bookIsbn") REFERENCES "book"("isbn") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD CONSTRAINT "FK_89faad163c9aa6e3faa0ba3da43" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD CONSTRAINT "FK_5464f3c1e27f251e84d0e385ec2" FOREIGN KEY ("bookIsbn") REFERENCES "book"("isbn") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP CONSTRAINT "FK_5464f3c1e27f251e84d0e385ec2"`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP CONSTRAINT "FK_89faad163c9aa6e3faa0ba3da43"`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP CONSTRAINT "FK_6d4862021ab7be9718f357df422"`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP CONSTRAINT "FK_70dc0e962f8a53d90b67e6d71ad"`);
        await queryRunner.query(`DROP INDEX "IDX_5464f3c1e27f251e84d0e385ec"`);
        await queryRunner.query(`DROP INDEX "IDX_89faad163c9aa6e3faa0ba3da4"`);
        await queryRunner.query(`DROP TABLE "user_books_to_read_book"`);
        await queryRunner.query(`DROP INDEX "IDX_6d4862021ab7be9718f357df42"`);
        await queryRunner.query(`DROP INDEX "IDX_70dc0e962f8a53d90b67e6d71a"`);
        await queryRunner.query(`DROP TABLE "user_owned_books_book"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
