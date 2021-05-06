import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLicensingAuthorizations1620309371459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'licensing_authorizations',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'department',
                        type: 'varchar',
                    },
                    {
                        name: 'activity',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'sub_activity',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'order',
                        type: 'integer',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licensing_authorizations');
    }

}
