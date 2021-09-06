import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class refactoryAttachments1630934722197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const customerAttachmentsTable = await queryRunner.getTable("customer_attachments");

        await queryRunner.addColumn(customerAttachmentsTable, new TableColumn({
            name: 'order',
            type: 'integer',
        }));

        const propertyAttachmentsTable = await queryRunner.getTable("property_attachments");

        await queryRunner.addColumn(propertyAttachmentsTable, new TableColumn({
            name: 'order',
            type: 'integer',
        }));

        const projectAttachmentsTable = await queryRunner.getTable("project_attachments");

        await queryRunner.addColumn(projectAttachmentsTable, new TableColumn({
            name: 'order',
            type: 'integer',
        }));

        const licensingAttachmentsTable = await queryRunner.getTable("licensing_attachments");

        await queryRunner.addColumn(licensingAttachmentsTable, new TableColumn({
            name: 'order',
            type: 'integer',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer_attachments\` DROP COLUMN \`order\`;`);

        await queryRunner.query(`ALTER TABLE \`property_attachments\` DROP COLUMN \`order\`;`);

        await queryRunner.query(`ALTER TABLE \`project_attachments\` DROP COLUMN \`order\`;`);

        await queryRunner.query(`ALTER TABLE \`licensing_attachments\` DROP COLUMN \`order\`;`);
    }

}
