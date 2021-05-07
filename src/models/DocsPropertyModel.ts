import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import PropertyDoc from './PropertyDocsModel';

@Entity('docs_property')
export default class DocsPropertyModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    active: boolean;

    @Column()
    order: number;

    @OneToMany(() => PropertyDoc, propertyDoc => propertyDoc.doc)
    @JoinColumn({ name: 'property_doc_id' })
    docs: PropertyDoc[];
}