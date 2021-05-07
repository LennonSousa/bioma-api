import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('project_types')
export default class ProjectTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Project, project => project.type)
    @JoinColumn({ name: 'project_type_id' })
    projects: Project[];
}