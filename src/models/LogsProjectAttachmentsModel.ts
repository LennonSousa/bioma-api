import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Attachment from './ProjectAttachmentsModel';

@Entity('logs_project_attachments')
export default class LogsProjectAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    accessed_at: Date;

    @Column()
    user: string;

    @Column()
    action: string;

    @ManyToOne(() => Attachment, attachment => attachment.logs)
    @JoinColumn({ name: 'attachment_id' })
    attachment: Attachment;
}