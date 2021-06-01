import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLicensingAttachments1622572004221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'licensing_attachments',
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
                },
                {
                    name: 'licensing_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'AttachmentLicensing',
                    columnNames: ['licensing_id'],
                    referencedTableName: 'licensings',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licensing_attachments');
    }

}
