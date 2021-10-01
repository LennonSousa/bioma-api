import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Property from './PropertiesModel';
import Log from './LogsPropertyAttachmentsModel';
import Share from './SharesPropertyAttachmentModel';

@Entity('property_attachments')
export default class PropertyAttachmentsModel {
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

    @Column()
    order: number;

    @ManyToOne(() => Property, property => property.attachments)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @OneToMany(() => Log, log => log.attachment, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'attachment_id' })
    logs: Log[];

    @OneToMany(() => Share, share => share.attachment)
    @JoinColumn({ name: 'attachment_id' })
    shares: Share[];
}