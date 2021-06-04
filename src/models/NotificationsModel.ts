import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';

@Entity('notifications')
export default class NotificationsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    sub_title: string;

    @Column()
    read: boolean;

    @Column()
    created_at: Date;

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn({ name: 'user_id' })
    user: User;
}