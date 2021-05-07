import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEventsLicensing1620313602578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'events_licensing',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'done',
                        type: 'boolean',
                        default: false,
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
                        name: 'finished_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'licensing_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'EventLicensing',
                        columnNames: ['licensing_id'],
                        referencedTableName: 'licensings',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events_licensing');
    }

}
