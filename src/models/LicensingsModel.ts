import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import Property from './PropertiesModel';
import LicensingInfringement from './LicensingInfringementsModel';
import LicensingAuthorization from './LicensingAuthorizationsModel';
import LicensingAgency from './LicensingAgenciesModel';
import LicensingStatus from './LicensingStatusModel';
import Event from './EventsLicensingModel';
import Attachment from './LicensingAttachmentsModel';

@Entity('licensings')
export default class LicensingsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    licensing_number: string;

    @Column()
    expire: string;

    @Column()
    renovation: string;

    @Column()
    deadline: string;

    @Column()
    process_number: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Customer, customer => customer.licensings)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Property, property => property.projects)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @ManyToOne(() => LicensingInfringement, licensingInfringement => licensingInfringement.licensings)
    @JoinColumn({ name: 'infringement_id' })
    infringement: LicensingInfringement;

    @ManyToOne(() => LicensingAuthorization, licensingAuthorization => licensingAuthorization.licensings)
    @JoinColumn({ name: 'licensing_authorization_id' })
    authorization: LicensingAuthorization;

    @ManyToOne(() => LicensingAgency, licensingAgency => licensingAgency.licensings)
    @JoinColumn({ name: 'licensing_agency_id' })
    agency: LicensingAgency;

    @ManyToOne(() => LicensingStatus, licensingStatus => licensingStatus.licensings)
    @JoinColumn({ name: 'licensing_status_id' })
    status: LicensingStatus;

    @OneToMany(() => Event, event => event.licensing)
    @JoinColumn({ name: 'licensing_id' })
    events: Event[];

    @OneToMany(() => Attachment, attachment => attachment.licensing)
    @JoinColumn({ name: 'licensing_id' })
    attachments: Attachment[];
}