import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';

@Entity('customer_types')
export default class CustomerTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Customer, customer => customer.type)
    @JoinColumn({ name: 'type_id' })
    customers: Customer[];
}