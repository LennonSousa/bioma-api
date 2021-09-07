import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';
import Licensing from './LicensingsModel';

@Entity('project_lines')
export default class ProjectLinesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Project, project => project.line)
    @JoinColumn({ name: 'project_line_id' })
    projects: Project[];

    @OneToMany(() => Licensing, licensing => licensing.line)
    @JoinColumn({ name: 'project_line_id' })
    licensings: Licensing[];
}