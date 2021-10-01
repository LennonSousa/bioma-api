import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import Log from './LogsCustomerAttachmentsModel';
import Share from './SharesCustomerAttachmentModel';

@Entity('customer_attachments')
export default class CustomerAttachmentsModel {
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

    @ManyToOne(() => Customer, licensing => licensing.attachments)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => Log, log => log.attachment, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'attachment_id' })
    logs: Log[];

    @OneToMany(() => Share, share => share.attachment)
    @JoinColumn({ name: 'attachment_id' })
    shares: Share[];
}