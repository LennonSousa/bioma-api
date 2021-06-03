import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Property from './PropertiesModel';
import User from './UsersModel';

@Entity('property_members')
export default class PropertyMembersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => Property, property => property.members)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @ManyToOne(() => User, user => user.propertyMembers)
    @JoinColumn({ name: 'user_id' })
    user: User;
}