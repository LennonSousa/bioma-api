import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPropertyAvaliations1634058913665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'property_avaliations',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'owner_name',
                        type: 'varchar',
                    },
                    {
                        name: 'owner_nick',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'owner_phone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'owner_school',
                        type: 'varchar',
                    },
                    {
                        name: 'owner_references',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'property_name',
                        type: 'varchar',
                    },
                    {
                        name: 'property_area',
                        type: 'varchar',
                    },
                    {
                        name: 'property_value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'property_location',
                        type: 'varchar',
                    },
                    {
                        name: 'property_city',
                        type: 'varchar',
                    },
                    {
                        name: 'property_state',
                        type: 'varchar',
                    },
                    {
                        name: 'property_router',
                        type: 'varchar',
                    },
                    {
                        name: 'property_distancy',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'property_access',
                        type: 'varchar',
                    },
                    {
                        name: 'property_winter_access',
                        type: 'varchar',
                    },
                    {
                        name: 'property_summer_access',
                        type: 'varchar',
                    },
                    {
                        name: 'property_owner',
                        type: 'varchar',
                    },
                    {
                        name: 'property_topography',
                        type: 'varchar',
                    },
                    {
                        name: 'property_texture',
                        type: 'varchar',
                    },
                    {
                        name: 'cover_mec',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_mec_species',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_mec_weeds',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_toco',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_toco_species',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_toco_weeds',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_grass',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_grass_species',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_agriculture',
                        type: 'varchar',
                    },
                    {
                        name: 'cover_culture',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'cover_productivity',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'fency_smooth',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'fency_barbed',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'salt_through',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'main_house',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'main_house_value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'secondary_house',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'secondady_house_value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'corral',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'corral_value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'energy',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'energy_type',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'energy_kva',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'weir',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'dam',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'well_amaz',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'well_artesian',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'drinking',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'river',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'river_type',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'river_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'market_calf',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'market_cow',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'market_ox',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'market_milk',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'notes',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'property_id',
                        type: 'varchar',
                    }
                ],
                foreignKeys: [
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
        await queryRunner.dropTable('property_avaliations');
    }

}
