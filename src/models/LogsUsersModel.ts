import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';

@Entity('logs_users')
export default class LogsUsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    accessed_at: Date;

    @Column()
    item: string;

    @Column()
    description: string;

    @Column()
    action: string;

    @Column()
    client_ip: string;

    @ManyToOne(() => User, user => user.logs)
    @JoinColumn({ name: 'user_id' })
    user: User;
}