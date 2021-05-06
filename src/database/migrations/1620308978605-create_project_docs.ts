import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectDocs1620308978605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'project_docs',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'expire',
                    type: 'date',
                },
                {
                    name: 'checked',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'project_id',
                    type: 'varchar',
                },
                {
                    name: 'project_doc_id',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'DocProject',
                    columnNames: ['project_id'],
                    referencedTableName: 'projects',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'DocDocsProject',
                    columnNames: ['project_doc_id'],
                    referencedTableName: 'docs_project',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project_docs');
    }

}
