import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjects1620241475552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'projects',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'deal',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'paid',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'paid_date',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'contract',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'analyst',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'analyst_contact',
                        type: 'varchar',
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
                        name: 'created_by',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'updated_by',
                        type: 'varchar',
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
                        name: 'project_type_id',
                        type: 'varchar',
                    },
                    {
                        name: 'project_line_id',
                        type: 'varchar',
                    },
                    {
                        name: 'project_status_id',
                        type: 'varchar',
                    },
                    {
                        name: 'bank_id',
                        type: 'varchar',
                    },
                    {
                        name: 'property_id',
                        type: 'varchar',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'ProjectCustomer',
                        columnNames: ['customer_id'],
                        referencedTableName: 'customers',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'ProjectType',
                        columnNames: ['project_type_id'],
                        referencedTableName: 'project_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'ProjectLine',
                        columnNames: ['project_line_id'],
                        referencedTableName: 'project_lines',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'ProjectStatus',
                        columnNames: ['project_status_id'],
                        referencedTableName: 'project_status',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'ProjectBank',
                        columnNames: ['bank_id'],
                        referencedTableName: 'banks',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'ProjectProperty',
                        columnNames: ['property_id'],
                        referencedTableName: 'properties',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects');
    }

}
