import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCustomers1620236019263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customers',
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
                    name: 'document',
                    type: 'varchar(50)',
                },
                {
                    name: 'phone',
                    type: 'varchar(50)',
                    isNullable: true,
                },
                {
                    name: 'cellphone',
                    type: 'varchar(50)',
                    isNullable: true,
                },
                {
                    name: 'contacts',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: true,
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
                    name: 'state',
                    type: 'varchar',
                },
                {
                    name: 'owner',
                    type: 'varchar(100)',
                    isNullable: true,
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'warnings',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'birth',
                    type: 'date',
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'Now()',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customers');
    }

}
