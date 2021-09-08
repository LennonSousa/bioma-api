import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Property from './PropertiesModel';

@Entity('logs_properties')
export default class LogsPropertiesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    accessed_at: Date;

    @Column()
    user: string;

    @Column()
    action: string;

    @Column()
    description: string;

    @Column()
    client_ip: string;

    @ManyToOne(() => Property, property => property.logs)
    @JoinColumn({ name: 'property_id' })
    property: Property;
}