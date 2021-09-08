import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('logs_licensings')
export default class LogsLicensingsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    accessed_at: Date;

    @Column()
    user: string;

    @Column()
    action: string;

    @Column()
    description: string;

    @Column()
    client_ip: string;

    @ManyToOne(() => Licensing, licensing => licensing.logs)
    @JoinColumn({ name: 'licensing_id' })
    licensing: Licensing;
}