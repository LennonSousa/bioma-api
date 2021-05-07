import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import DocCustomer from './DocsCustomerModel';

@Entity('customer_docs')
export default class CustomerDocsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @Column()
    checked: boolean;

    @ManyToOne(() => Customer, customer => customer.docs)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => DocCustomer, docCustomer => docCustomer.docs)
    @JoinColumn({ name: 'doc_id' })
    doc: DocCustomer;
}