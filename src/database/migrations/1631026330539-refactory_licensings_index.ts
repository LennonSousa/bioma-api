import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class refactoryLicensingsIndex1631026330539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0;`);

        await queryRunner.addColumns("licensings",
            [
                new TableColumn({
                    name: 'project_type_id',
                    type: 'varchar',
                }),
                new TableColumn({
                    name: 'project_line_id',
                    type: 'varchar',
                }),
                new TableColumn({
                    name: 'bank_id',
                    type: 'varchar',
                }),
            ]
        );

        await queryRunner.createIndices("licensings",
            [
                new TableIndex({
                    name: "ProjectTypeOnLicensing",
                    columnNames: ["project_type_id"]
                }),
                new TableIndex({
                    name: "ProjectLineOnLicensing",
                    columnNames: ["project_line_id"]
                }),
                new TableIndex({
                    name: "BankOnLicensing",
                    columnNames: ["bank_id"]
                }),
            ]
        );

        await queryRunner.createForeignKeys("licensings",
            [
                new TableForeignKey({
                    name: "ProjectTypeOnLicensing",
                    columnNames: ["project_type_id"],
                    referencedTableName: "project_types",
                    referencedColumnNames: ["id"],
                }),
                new TableForeignKey({
                    name: "ProjectLineOnLicensing",
                    columnNames: ["project_line_id"],
                    referencedTableName: "project_lines",
                    referencedColumnNames: ["id"],
                }),
                new TableForeignKey({
                    name: "BankOnLicensing",
                    columnNames: ["bank_id"],
                    referencedTableName: "banks",
                    referencedColumnNames: ["id"],
                }),
            ]
        );

        await queryRunner.query(`SET FOREIGN_KEY_CHECKS=1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS=1;`);

        await queryRunner.dropForeignKey("licensings", "ProjectTypeOnLicensing");
        await queryRunner.dropForeignKey("licensings", "ProjectLineOnLicensing");
        await queryRunner.dropForeignKey("licensings", "BankOnLicensing");

        await queryRunner.dropIndex("licensings", "ProjectTypeOnLicensing");
        await queryRunner.dropIndex("licensings", "ProjectLineOnLicensing");
        await queryRunner.dropIndex("licensings", "BankOnLicensing");

        await queryRunner.dropColumn("licensings", "project_type_id");
        await queryRunner.dropColumn("licensings", "project_line_id");
        await queryRunner.dropColumn("licensings", "bank_id");
    }

}
