import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class refactoryAttachments1630934722197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("customer_attachments", new TableColumn({
            name: 'order',
            type: 'integer',
        }));

        await queryRunner.addColumn("property_attachments", new TableColumn({
            name: 'order',
            type: 'integer',
        }));

        await queryRunner.addColumn("property_attachments", new TableColumn({
            name: 'order',
            type: 'integer',
        }));

        await queryRunner.addColumn("licensing_attachments", new TableColumn({
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
