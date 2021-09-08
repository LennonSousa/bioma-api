import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('logs_projects')
export default class LogsProjectsModel {
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

    @ManyToOne(() => Project, project => project.logs)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}