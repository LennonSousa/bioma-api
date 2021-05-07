import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCustomerAttachments1620392268745 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customer_attachments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'received_at',
                    type: 'date',
                },
                {
                    name: 'expire',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'expire_at',
                    type: 'varchar',
                },
                {
                    name: 'renewal',
                    type: 'varchar(100)',
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'AttachmentCustomer',
                    columnNames: ['customer_id'],
                    referencedTableName: 'customers',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer_attachments');
    }

}
