import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Bank from './BanksModel';

@Entity('institutions')
export default class InstitutionsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @OneToMany(() => Bank, bank => bank.institution)
    @JoinColumn({ name: 'institution_id' })
    banks: Bank[];
}