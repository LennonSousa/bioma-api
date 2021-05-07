import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Type from './UserTypesModel';

@Entity('users')
export default class UsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;

    @Column()
    paused: boolean;

    @Column()
    created_at: Date;

    @ManyToOne(() => Type, type => type.users)
    @JoinColumn({ name: 'type_id' })
    type: Type;
}