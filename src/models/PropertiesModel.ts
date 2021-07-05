import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import PropertyDoc from './PropertyDocsModel';
import Project from './ProjectsModel';
import Attachment from './PropertyAttachmentsModel';
import Member from './PropertyMembersModel';

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
    coordinates: string;

    @Column()
    notes: string;

    @Column()
    warnings: boolean;

    @Column()
    warnings_text: string;

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

    @OneToMany(() => Attachment, attachment => attachment.property)
    @JoinColumn({ name: 'property_id' })
    attachments: Attachment[];

    @OneToMany(() => Member, member => member.property, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'customer_id' })
    members: Member[];
}