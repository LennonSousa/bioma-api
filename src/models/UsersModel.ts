import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from './UsersRolesModel';
import ProjectMember from './ProjectMembersModel';
import LicensingMember from './LicensingMembersModel';

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
    sudo: boolean;

    @Column()
    created_at: Date;

    @OneToMany(() => Role, role => role.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'users_id' })
    roles: Role[];

    @OneToMany(() => ProjectMember, projectMember => projectMember.user)
    @JoinColumn({ name: 'user_id' })
    projectMembers: ProjectMember[];

    @OneToMany(() => LicensingMember, licensingMember => licensingMember.user)
    @JoinColumn({ name: 'user_id' })
    licensingMembers: LicensingMember[];
}