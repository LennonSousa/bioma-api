import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLogsUsers1631104762923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs_users',
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
                    name: 'item',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'action',
                    type: 'varchar(50)',
                },
                {
                    name: 'client_ip',
                    type: 'varchar(45)',
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'UserOnLog',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs_users');
    }

}
