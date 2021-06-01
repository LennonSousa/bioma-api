import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Property from './PropertiesModel';

@Entity('property_attachments')
export default class PropertyAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @Column()
    expire: boolean;

    @Column()
    expire_at: Date;

    @ManyToOne(() => Property, property => property.attachments)
    @JoinColumn({ name: 'property_id' })
    property: Property;
}