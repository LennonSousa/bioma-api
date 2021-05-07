import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPropertyDocs1620308520800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'property_docs',
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
                    name: 'property_id',
                    type: 'varchar',
                },
                {
                    name: 'property_doc_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'DocProperty',
                    columnNames: ['property_id'],
                    referencedTableName: 'properties',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'DocDocsProperty',
                    columnNames: ['property_doc_id'],
                    referencedTableName: 'docs_property',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('property_docs');
    }

}
