import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class refactoryProperties1624278957383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("properties");
        const column = table.findColumnByName("route");

        await queryRunner.changeColumn(table, column, new TableColumn({
            name: "route",
            type: "text"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("properties");
        const column = table.findColumnByName("route");

        await queryRunner.changeColumn(table, column, new TableColumn({
            name: "route",
            type: "varchar",
        }));
    }
}
