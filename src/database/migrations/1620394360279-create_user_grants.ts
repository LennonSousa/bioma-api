import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserGrants1620394360279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_grants',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'role',
                    type: 'varchar(100)',
                },
                {
                    name: 'permission',
                    type: 'varchar(100)',
                },
                {
                    name: 'user_types_id',
                    type: 'integer',
                    unsigned: true,
                },
            ],
            foreignKeys: [
                {
                    name: 'GrantType',
                    columnNames: ['user_types_id'],
                    referencedTableName: 'user_types',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_grants');
    }

}
