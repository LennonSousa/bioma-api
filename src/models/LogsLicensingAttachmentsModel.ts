import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Attachment from './LicensingAttachmentsModel';

@Entity('logs_licensing_attachments')
export default class LogsLicensingtAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    accessed_at: Date;

    @Column()
    user: string;

    @Column()
    action: string;

    @Column()
    client_ip: string;

    @ManyToOne(() => Attachment, attachment => attachment.logs)
    @JoinColumn({ name: 'attachment_id' })
    attachment: Attachment;
}