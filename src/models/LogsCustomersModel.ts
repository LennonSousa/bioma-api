import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';

@Entity('logs_customers')
export default class LogsCustomersModel {
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

    @ManyToOne(() => Customer, customer => customer.logs)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}