import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectAttachments1622571912995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'project_attachments',
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
                    type: 'date',
                    default: '(CURRENT_DATE)',
                },
                {
                    name: 'schedule',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'schedule_at',
                    type: 'date',
                    default: '(CURRENT_DATE)',
                },
                {
                    name: 'project_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'AttachmentProject',
                    columnNames: ['project_id'],
                    referencedTableName: 'projects',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project_attachments');
    }

}
