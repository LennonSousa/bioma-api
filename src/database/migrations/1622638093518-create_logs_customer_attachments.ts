import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLogsCustomerAttachments1622638093518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs_customer_attachments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'accessed_at',
                    type: 'datetime',
                },
                {
                    name: 'user',
                    type: 'varchar',
                },
                {
                    name: 'action',
                    type: 'varchar(50)',
                },
                {
                    name: 'attachment_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'CustomerAttachment',
                    columnNames: ['attachment_id'],
                    referencedTableName: 'customer_attachments',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs_customer_attachments');
    }

}
