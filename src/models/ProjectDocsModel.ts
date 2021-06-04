import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';
import DocProject from './DocsProjectModel';

@Entity('project_docs')
export default class ProjectDocsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @Column()
    checked: boolean;

    @ManyToOne(() => Project, project => project.docs)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => DocProject, docProject => docProject.docs)
    @JoinColumn({ name: 'project_doc_id' })
    doc: DocProject;
}