import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryCustomers1625487999725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` ADD COLUMN \`warnings_text\` TEXT NULL AFTER \`warnings\`;`);
        await queryRunner.query(`ALTER TABLE \`properties\` ADD COLUMN \`warnings_text\` TEXT NULL AFTER \`warnings\`;`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD COLUMN \`warnings_text\` TEXT NULL AFTER \`warnings\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`warnings_text\`;`);
        await queryRunner.query(`ALTER TABLE \`properties\` DROP COLUMN \`warnings_text\`;`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`warnings_text\`;`);
    }

}
