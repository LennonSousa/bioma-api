import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from './UsersRolesModel';
import CustomerMember from './CustomerMembersModel';
import LicensingMember from './LicensingMembersModel';
import ProjectMember from './ProjectMembersModel';
import PropertyMember from './PropertyMembersModel';
import Notifications from './NotificationsModel';
import Reset from './UsersResetsModel';

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

    @OneToMany(() => CustomerMember, customerMember => customerMember.user)
    @JoinColumn({ name: 'user_id' })
    customerMembers: CustomerMember[];

    @OneToMany(() => LicensingMember, licensingMember => licensingMember.user)
    @JoinColumn({ name: 'user_id' })
    licensingMembers: LicensingMember[];

    @OneToMany(() => ProjectMember, projectMember => projectMember.user)
    @JoinColumn({ name: 'user_id' })
    projectMembers: ProjectMember[];

    @OneToMany(() => PropertyMember, propertyMember => propertyMember.user)
    @JoinColumn({ name: 'user_id' })
    propertyMembers: PropertyMember[];

    @OneToMany(() => Notifications, notification => notification.user)
    @JoinColumn({ name: 'user_id' })
    notifications: Notifications[];

    @OneToMany(() => Reset, reset => reset.user)
    @JoinColumn({ name: 'user_id' })
    resets: Reset[];
}