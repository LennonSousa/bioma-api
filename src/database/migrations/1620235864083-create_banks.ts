import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBanks1620235864083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'banks',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'agency',
                    type: 'varchar',
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'country',
                    type: 'varchar',
                },
                {
                    name: 'sector',
                    type: 'varchar',
                },
                {
                    name: 'department',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'cellphone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'institution_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'Institution',
                    columnNames: ['institution_id'],
                    referencedTableName: 'institutions',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('banks');
    }

}
