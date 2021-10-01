import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSharesProjectAttachment1633123852772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'shares_project_attachment',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'expire_at',
                    type: 'datetime',
                },
                {
                    name: 'activated',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'activated_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'created_by',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'Now()',
                },
                {
                    name: 'attachment_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'ProjectAttachmentOnShare',
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
        await queryRunner.dropTable('shares_project_attachment');
    }

}
