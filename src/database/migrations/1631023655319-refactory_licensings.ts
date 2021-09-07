import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryLicensings1631023655319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`licensings\` ` +
            `ADD COLUMN \`value\` DECIMAL(10,2) NOT NULL DEFAULT '0.00' AFTER \`process_number\`, ` +
            `ADD COLUMN \`deal\` DECIMAL(10,2) NOT NULL DEFAULT '0.00' AFTER \`value\`, ` +
            `ADD COLUMN \`paid\` TINYINT(1) NOT NULL DEFAULT '0' AFTER \`deal\`, ` +
            `ADD COLUMN \`paid_date\` VARCHAR(50) NULL AFTER \`paid\`, ` +
            `ADD COLUMN \`contract\` VARCHAR(255) NULL AFTER \`paid_date\`, ` +
            `ADD COLUMN \`notes\` TEXT NULL AFTER \`contract\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`licensings\` DROP COLUMN \`value\`,` +
            `DROP COLUMN \`deal\`, ` +
            `DROP COLUMN \`paid\`, ` +
            `DROP COLUMN \`paid_date\`, ` +
            `DROP COLUMN \`contract\`, ` +
            `DROP COLUMN \`notes\`;`);

    }

}
