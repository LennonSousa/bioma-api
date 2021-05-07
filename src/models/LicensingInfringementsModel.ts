import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('licensing_infringements')
export default class LicensingsInfringementsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Licensing, licensing => licensing.infringement)
    @JoinColumn({ name: 'infringement_id' })
    licensings: Licensing[];
}