import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Property from './PropertiesModel';

@Entity('projects')
export default class ProjectsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    owner_name: string;

    @Column()
    owner_nick: string;

    @Column()
    owner_phone: string;

    @Column()
    owner_school: string;

    @Column()
    owner_references: string;

    @Column()
    property_name: string;

    @Column()
    property_area: string;

    @Column()
    property_value: number;

    @Column()
    property_location: string;

    @Column()
    property_city: string;

    @Column()
    property_state: string;

    @Column()
    property_router: string;

    @Column()
    property_distancy: string;

    @Column()
    property_access: string;

    @Column()
    property_winter_access: string;

    @Column()
    property_summer_access
        : string;

    @Column()
    property_owner: string;

    @Column()
    property_topography: string;

    @Column()
    property_texture: string;

    @Column()
    cover_mec: string;

    @Column()
    cover_mec_species: string;

    @Column()
    cover_mec_weeds: string;

    @Column()
    cover_toco: string;

    @Column()
    cover_toco_species: string;

    @Column()
    cover_toco_weeds: string;

    @Column()
    cover_grass: string;

    @Column()
    cover_grass_species: string;

    @Column()
    cover_agriculture: string;

    @Column()
    cover_culture: string;

    @Column()
    cover_productivity: string;

    @Column()
    fency_smooth: string;

    @Column()
    fency_barbed: string;

    @Column()
    salt_through: string;

    @Column()
    main_house: string;

    @Column()
    main_house_value: number;

    @Column()
    secondary_house: string;

    @Column()
    secondady_house_value: number;

    @Column()
    corral: string;

    @Column()
    corral_value: number;

    @Column()
    energy: boolean;

    @Column()
    energy_type: string;

    @Column()
    energy_kva: string;

    @Column()
    weir: string;

    @Column()
    dam: string;

    @Column()
    well_amaz: string;

    @Column()
    well_artesian: string;

    @Column()
    drinking: string;

    @Column()
    river: boolean;

    @Column()
    river_type: string;

    @Column()
    river_name: string;

    @Column()
    market_calf: number;

    @Column()
    market_cow: number;

    @Column()
    market_ox: number;

    @Column()
    market_milk: number;

    @Column()
    notes: string;

    @ManyToOne(() => Property, property => property.projects)
    @JoinColumn({ name: 'property_id' })
    property: Property;
}