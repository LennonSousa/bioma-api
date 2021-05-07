import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('licensing_status')
export default class LicensingsStatusModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Licensing, licensings => licensings.status)
    @JoinColumn({ name: 'institution_id' })
    licensings: Licensing[];
}