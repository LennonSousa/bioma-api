import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('licensing_agencies')
export default class LicensingsAgenciesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Licensing, licensing => licensing.agency)
    @JoinColumn({ name: 'licensing_agency_id' })
    licensings: Licensing[];
}