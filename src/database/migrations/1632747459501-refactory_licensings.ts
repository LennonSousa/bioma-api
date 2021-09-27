import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryLicensings1632747459501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`licensings\` DROP FOREIGN KEY \`ProjectLineOnLicensing\`,` +
            ` DROP FOREIGN KEY \`BankOnLicensing\`;`);

        await queryRunner.query(`ALTER TABLE \`licensings\` DROP COLUMN \`bank_id\`,` +
            ` DROP COLUMN \`project_line_id\`, DROP INDEX \`BankOnLicensing\` , DROP INDEX \`ProjectLineOnLicensing\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`licensings\` ADD COLUMN \`bank_id\` VARCHAR NULL AFTER \`project_type_id\`,` +
            `ADD COLUMN \`project_line_id\` VARCHAR NULL AFTER \`bank_id\`;`);
    }

}
