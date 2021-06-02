import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLicensingMembers1622645690028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'licencing_members',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'licensing_id',
                    type: 'varchar',
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'LicensingMember',
                    columnNames: ['licensing_id'],
                    referencedTableName: 'licensings',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'UserLicensingMember',
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
        await queryRunner.dropTable('licencing_members');
    }

}
