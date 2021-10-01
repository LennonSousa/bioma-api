import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Attachment from './ProjectAttachmentsModel';

@Entity('shares_project_attachment')
export default class SharesProjecttAttachmentModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    email: string;

    @Column()
    token: string;

    @Column()
    expire_at: Date;

    @Column()
    activated: boolean;

    @Column()
    activated_at: Date;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => Attachment, attachment => attachment.shares)
    @JoinColumn({ name: 'attachment_id' })
    attachment: Attachment;
}