import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';
import Log from './LogsLicensingAttachmentsModel';

@Entity('licensing_attachments')
export default class LicensingAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @Column()
    expire: boolean;

    @Column()
    expire_at: Date;

    @Column()
    schedule: boolean;

    @Column()
    schedule_at: Date;

    @ManyToOne(() => Licensing, licensing => licensing.attachments)
    @JoinColumn({ name: 'licensing_id' })
    licensing: Licensing;

    @OneToMany(() => Log, log => log.attachment, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'attachment_id' })
    logs: Log[];
}