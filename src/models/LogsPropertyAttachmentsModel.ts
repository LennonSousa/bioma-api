import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Attachment from './PropertyAttachmentsModel';

@Entity('logs_property_attachments')
export default class LogsPropertyAttachmentsModel {
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