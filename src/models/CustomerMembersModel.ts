import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import User from './UsersModel';

@Entity('customer_members')
export default class CustomerMembersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => Customer, customer => customer.members)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, user => user.customerMembers)
    @JoinColumn({ name: 'user_id' })
    user: User;
}