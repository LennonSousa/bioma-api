import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import PropertyDoc from './PropertyDocsModel';
import Project from './ProjectsModel';

@Entity('properties')
export default class PropertiesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    registration: string;

    @Column()
    route: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    area: string;

    @Column()
    notes: string;

    @Column()
    warnings: boolean;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Customer, customer => customer.properties)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => PropertyDoc, propertyDoc => propertyDoc.property, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'property_id' })
    docs: PropertyDoc[];

    @OneToMany(() => Project, project => project.property)
    @JoinColumn({ name: 'property_id' })
    projects: Project[];
}