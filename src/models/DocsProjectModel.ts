import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ProjectDoc from './ProjectDocsModel';

@Entity('docs_project')
export default class DocsProjectModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    active: boolean;

    @Column()
    order: number;

    @OneToMany(() => ProjectDoc, projectDoc => projectDoc.doc)
    @JoinColumn({ name: 'project_doc_id' })
    docs: ProjectDoc[];
}