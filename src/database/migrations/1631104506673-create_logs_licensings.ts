import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLogsLicensings1631104506673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs_licensings',
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
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'client_ip',
                    type: 'varchar(45)',
                },
                {
                    name: 'licensing_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'LicensingOnLog',
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
        await queryRunner.dropTable('logs_licensings');
    }

}
