import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class refactoryLogsAttachments1631051050183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`logs_customer_attachments\` ` +
            `ADD COLUMN \`client_ip\` VARCHAR(45) NOT NULL DEFAULT '0.0.0.0' AFTER \`action\`;`);

        await queryRunner.query(`ALTER TABLE \`logs_licensing_attachments\` ` +
            `ADD COLUMN \`client_ip\` VARCHAR(45) NOT NULL DEFAULT '0.0.0.0' AFTER \`action\`;`);

        await queryRunner.query(`ALTER TABLE \`logs_project_attachments\` ` +
            `ADD COLUMN \`client_ip\` VARCHAR(45) NOT NULL DEFAULT '0.0.0.0' AFTER \`action\`;`);

        await queryRunner.query(`ALTER TABLE \`logs_property_attachments\` ` +
            `ADD COLUMN \`client_ip\` VARCHAR(45) NOT NULL DEFAULT '0.0.0.0' AFTER \`action\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("logs_customer_attachments", "client_ip");
        await queryRunner.dropColumn("logs_licensing_attachments", "client_ip");
        await queryRunner.dropColumn("logs_project_attachments", "client_ip");
        await queryRunner.dropColumn("logs_property_attachments", "client_ip");
    }

}
