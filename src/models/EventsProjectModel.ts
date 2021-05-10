import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('events_project')
export default class EventsProjectModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column()
    done: boolean;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @Column()
    finished_at: Date;

    @ManyToOne(() => Project, project => project.events)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}