import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLogsProjects1631104596210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs_projects',
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
                    name: 'project_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'ProjectOnLog',
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
        await queryRunner.dropTable('logs_projects');
    }

}
