import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class refactoryNotifications1623949163646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("notifications");

        await queryRunner.addColumns(table,
            [
                new TableColumn({
                    name: "item",
                    type: "varchar"
                }),
                new TableColumn({
                    name: "item_id",
                    type: "varchar"
                })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("notifications");

        await queryRunner.dropColumn(table, "item");
        await queryRunner.dropColumn(table, "item_id");
    }
}
