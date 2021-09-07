import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Institution from './InstitutionsModel';
import Project from './ProjectsModel';
import Licensing from './LicensingsModel';

@Entity('banks')
export default class BanksModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    agency: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    sector: string;

    @Column()
    department: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @ManyToOne(() => Institution, institution => institution.banks)
    @JoinColumn({ name: 'institution_id' })
    institution: Institution;

    @OneToMany(() => Project, project => project.bank)
    @JoinColumn({ name: 'bank_id' })
    projects: Project[];

    @OneToMany(() => Licensing, licensing => licensing.bank)
    @JoinColumn({ name: 'bank_id' })
    licensings: Licensing[];
}