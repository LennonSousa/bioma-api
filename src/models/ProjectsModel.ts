import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import ProjectDoc from './ProjectDocsModel';
import Bank from './BanksModel';
import Property from './PropertiesModel';
import ProjectType from './ProjectTypesModel';
import ProjectStatus from './ProjectStatusModel';
import ProjectLine from './ProjectLinesModel';
import Event from './EventsProjectModel';
import Attachment from './ProjectAttachmentsModel';
import Member from './ProjectMembersModel';
import Log from './LogsProjectsModel';

@Entity('projects')
export default class ProjectsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    value: number;

    @Column()
    deal: number;

    @Column()
    paid: boolean;

    @Column()
    paid_date: string;

    @Column()
    contract: string;

    @Column()
    analyst: string;

    @Column()
    analyst_contact: string;

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

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @OneToMany(() => ProjectDoc, projectDoc => projectDoc.project, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'project_id' })
    docs: ProjectDoc[];

    @ManyToOne(() => Customer, customer => customer.projects)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Bank, bank => bank.projects)
    @JoinColumn({ name: 'bank_id' })
    bank: Bank;

    @ManyToOne(() => Property, property => property.projects)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @ManyToOne(() => ProjectType, projectType => projectType.projects)
    @JoinColumn({ name: 'project_type_id' })
    type: ProjectType;

    @ManyToOne(() => ProjectStatus, projectStatus => projectStatus.projects)
    @JoinColumn({ name: 'project_status_id' })
    status: ProjectStatus;

    @ManyToOne(() => ProjectLine, projectLine => projectLine.projects)
    @JoinColumn({ name: 'project_line_id' })
    line: ProjectLine;

    @OneToMany(() => Event, event => event.project)
    @JoinColumn({ name: 'project_id' })
    events: Event[];

    @OneToMany(() => Attachment, attachment => attachment.project)
    @JoinColumn({ name: 'project_id' })
    attachments: Attachment[];

    @OneToMany(() => Member, member => member.project, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'project_id' })
    members: Member[];

    @OneToMany(() => Log, log => log.project, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'project_id' })
    logs: Log[];
}