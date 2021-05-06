import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLicensings1620309792606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'licensings',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'property_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'infringement_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'licensing_number',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'expire',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'renovation',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'deadline',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'process_number',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'customer_id',
                        type: 'varchar',
                    },
                    {
                        name: 'licensing_authorization_id',
                        type: 'varchar',
                    },
                    {
                        name: 'licensing_agency_id',
                        type: 'varchar',
                    },
                    {
                        name: 'licensing_status_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'LicensingCustomer',
                        columnNames: ['customer_id'],
                        referencedTableName: 'customers',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'LicensingAuthorization',
                        columnNames: ['licensing_authorization_id'],
                        referencedTableName: 'licensing_authorizations',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'LicensingAgency',
                        columnNames: ['licensing_agency_id'],
                        referencedTableName: 'licensing_agencies',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'LicensingStatus',
                        columnNames: ['licensing_status_id'],
                        referencedTableName: 'licensing_status',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licensings');
    }

}
