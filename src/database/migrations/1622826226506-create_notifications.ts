import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNotifications1622826226506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'notifications',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'sub_title',
                    type: 'varchar',
                },
                {
                    name: 'read',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'date',
                    default: '(CURRENT_DATE)',
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'NotificationUser',
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
        await queryRunner.dropTable('notifications');
    }

}
