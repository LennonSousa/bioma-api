import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('project_lines')
export default class ProjectLinesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Project, project => project.line)
    @JoinColumn({ name: 'institution_id' })
    projects: Project[];
}