import {MigrationInterface, QueryRunner} from "typeorm";

export class addedIdToBooks1621923160725 implements MigrationInterface {
    name = 'addedIdToBooks1621923160725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP CONSTRAINT "FK_6d4862021ab7be9718f357df422"`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP CONSTRAINT "FK_5464f3c1e27f251e84d0e385ec2"`);
        await queryRunner.query(`DROP INDEX "IDX_6d4862021ab7be9718f357df42"`);
        await queryRunner.query(`DROP INDEX "IDX_5464f3c1e27f251e84d0e385ec"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "PK_bd183604b9c828c0bdd92cafab7"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_7cbbde1a59f96571edd8ddde9d4" PRIMARY KEY ("isbn", "id")`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD "bookId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP CONSTRAINT "PK_da53dd47614d650d182d7a71fdd"`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD CONSTRAINT "PK_014aa1a9cd83a57810339f899ad" PRIMARY KEY ("userId", "bookIsbn", "bookId")`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD "bookId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP CONSTRAINT "PK_81347fa8a1f1fc6ee5bbf23dccc"`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD CONSTRAINT "PK_4be34058c70be08456f5f58bd7f" PRIMARY KEY ("userId", "bookIsbn", "bookId")`);
        await queryRunner.query(`CREATE INDEX "IDX_b5e289417ae6d0b8b89a586a89" ON "user_owned_books_book" ("bookId", "bookIsbn") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e22ab6050574508e8452591f3" ON "user_books_to_read_book" ("bookId", "bookIsbn") `);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD CONSTRAINT "FK_b5e289417ae6d0b8b89a586a89c" FOREIGN KEY ("bookId", "bookIsbn") REFERENCES "book"("id","isbn") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD CONSTRAINT "FK_4e22ab6050574508e8452591f3c" FOREIGN KEY ("bookId", "bookIsbn") REFERENCES "book"("id","isbn") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP CONSTRAINT "FK_4e22ab6050574508e8452591f3c"`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP CONSTRAINT "FK_b5e289417ae6d0b8b89a586a89c"`);
        await queryRunner.query(`DROP INDEX "IDX_4e22ab6050574508e8452591f3"`);
        await queryRunner.query(`DROP INDEX "IDX_b5e289417ae6d0b8b89a586a89"`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP CONSTRAINT "PK_4be34058c70be08456f5f58bd7f"`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD CONSTRAINT "PK_81347fa8a1f1fc6ee5bbf23dccc" PRIMARY KEY ("userId", "bookIsbn")`);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP CONSTRAINT "PK_014aa1a9cd83a57810339f899ad"`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD CONSTRAINT "PK_da53dd47614d650d182d7a71fdd" PRIMARY KEY ("userId", "bookIsbn")`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "PK_7cbbde1a59f96571edd8ddde9d4"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_bd183604b9c828c0bdd92cafab7" PRIMARY KEY ("isbn")`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "id"`);
        await queryRunner.query(`CREATE INDEX "IDX_5464f3c1e27f251e84d0e385ec" ON "user_books_to_read_book" ("bookIsbn") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d4862021ab7be9718f357df42" ON "user_owned_books_book" ("bookIsbn") `);
        await queryRunner.query(`ALTER TABLE "user_books_to_read_book" ADD CONSTRAINT "FK_5464f3c1e27f251e84d0e385ec2" FOREIGN KEY ("bookIsbn") REFERENCES "book"("isbn") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_owned_books_book" ADD CONSTRAINT "FK_6d4862021ab7be9718f357df422" FOREIGN KEY ("bookIsbn") REFERENCES "book"("isbn") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
