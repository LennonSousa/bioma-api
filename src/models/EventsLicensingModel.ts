import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('events_licensing')
export default class EventsLicensingModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column()
    done: boolean;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @Column()
    finished_at: Date;

    @ManyToOne(() => Licensing, licensing => licensing.events)
    @JoinColumn({ name: 'licensing_id' })
    licensing: Licensing;
}