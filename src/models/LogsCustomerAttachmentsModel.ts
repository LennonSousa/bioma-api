import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Attachment from './CustomerAttachmentsModel';

@Entity('logs_customer_attachments')
export default class LogsCustomerAttachmentsModel {
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