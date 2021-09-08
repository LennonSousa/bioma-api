import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLogsProperties1631104636584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'logs_properties',
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
                    name: 'property_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'PropertyOnLog',
                    columnNames: ['property_id'],
                    referencedTableName: 'properties',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('logs_properties');
    }

}
