import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Property from './PropertiesModel';
import DocProperty from './DocsPropertyModel';

@Entity('property_docs')
export default class PropertyDocsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @Column()
    checked: boolean;

    @ManyToOne(() => Property, property => property.docs)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @ManyToOne(() => DocProperty, docProperty => docProperty.docs)
    @JoinColumn({ name: 'property_doc_id' })
    doc: DocProperty;
}