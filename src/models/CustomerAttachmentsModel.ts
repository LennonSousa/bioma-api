import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';

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
    renewal: number;

    @ManyToOne(() => Customer, licensing => licensing.attachments)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}