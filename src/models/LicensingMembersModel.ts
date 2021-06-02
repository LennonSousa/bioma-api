import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Licensing from './LicensingsModel';
import User from './UsersModel';

@Entity('licencing_members')
export default class LicensingMembersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => Licensing, licensing => licensing.members)
    @JoinColumn({ name: 'licensing_id' })
    licensing: Licensing;

    @ManyToOne(() => User, user => user.licensingMembers)
    @JoinColumn({ name: 'user_id' })
    user: User;
}