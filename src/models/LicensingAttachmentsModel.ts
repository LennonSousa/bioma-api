import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';

@Entity('customer_attachments')
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

    @ManyToOne(() => Licensing, licensing => licensing.attachments)
    @JoinColumn({ name: 'licensing_id' })
    licensing: Licensing;
}