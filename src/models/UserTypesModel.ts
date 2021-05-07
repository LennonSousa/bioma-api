import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';
import Grant from './UserGrantsModel'

@Entity('user_types')
export default class UserTypesModel {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    code: number;

    @OneToMany(() => User, user => user.type)
    @JoinColumn({ name: 'type_id' })
    users: User[];

    @OneToMany(() => Grant, grant => grant.type)
    @JoinColumn({ name: 'user_types_id' })
    grants: Grant[];
}