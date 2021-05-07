import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import CustomerDoc from './CustomerDocsModel';

@Entity('docs_customer')
export default class DocsCustomerModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    active: boolean;

    @Column()
    order: number;

    @OneToMany(() => CustomerDoc, customerDoc => customerDoc.doc)
    @JoinColumn({ name: 'doc_id' })
    docs: CustomerDoc[];
}