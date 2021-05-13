import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCustomerDocs1620238509511 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customer_docs',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'path',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'received_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'checked',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                },
                {
                    name: 'doc_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'DocCustomer',
                    columnNames: ['customer_id'],
                    referencedTableName: 'customers',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'DocFromDocs',
                    columnNames: ['doc_id'],
                    referencedTableName: 'docs_customer',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer_docs');
    }

}
