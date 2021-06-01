import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('customer_attachments')
export default class ProjectAttachmentsModel {
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

    @ManyToOne(() => Project, project => project.attachments)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}