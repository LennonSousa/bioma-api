import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import CustomerDoc from './CustomerDocsModel';
import Property from './PropertiesModel';
import Project from './ProjectsModel';

@Entity('customers')
export default class CustomersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    contacts: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    owner: string;

    @Column()
    notes: string;

    @Column()
    warnings: boolean;

    @Column()
    birth: Date;

    @OneToMany(() => CustomerDoc, customerDoc => customerDoc.doc)
    @JoinColumn({ name: 'customer_id' })
    docs: CustomerDoc[];

    @OneToMany(() => Property, property => property.customer)
    @JoinColumn({ name: 'customer_id' })
    properties: Property[];

    @OneToMany(() => Project, project => project.customer)
    @JoinColumn({ name: 'customer_id' })
    projects: Project[];
}