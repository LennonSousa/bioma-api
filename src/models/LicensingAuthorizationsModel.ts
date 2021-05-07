import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('licensing_authorizations')
export default class LicensingsAuthorizationsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    department: string;

    @Column()
    activity: string;

    @Column()
    sub_activity: string;

    @Column()
    order: number;

    @OneToMany(() => Licensing, licensing => licensing.authorization)
    @JoinColumn({ name: 'licensing_authorization_id' })
    licensings: Licensing[];
}