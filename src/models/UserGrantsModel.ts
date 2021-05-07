import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Type from './UserTypesModel';

@Entity('user_grants')
export default class UserGrantsTypesModel {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    role: string;

    @Column()
    permission: string;

    @ManyToOne(() => Type, type => type.grants)
    @JoinColumn({ name: 'user_types_id' })
    type: Type;
}