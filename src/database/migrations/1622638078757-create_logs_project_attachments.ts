import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLogsProjectAttachments1622638078757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs_project_attachments',
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
                    name: 'ProjectAttachment',
                    columnNames: ['attachment_id'],
                    referencedTableName: 'project_attachments',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs_project_attachments');
    }

}
