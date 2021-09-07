import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';
import Licensing from './LicensingsModel';

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

    @OneToMany(() => Licensing, licensing => licensing.type)
    @JoinColumn({ name: 'project_type_id' })
    licensings: Licensing[];
}