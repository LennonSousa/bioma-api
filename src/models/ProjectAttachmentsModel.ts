import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';
import Log from './LogsProjectAttachmentsModel';
import Share from './SharesProjectAttachmentModel';

@Entity('project_attachments')
export default class ProjectAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @Column()
    expire: boolean;

    @Column()
    expire_at: Date;

    @Column()
    schedule: boolean;

    @Column()
    schedule_at: Date;

    @Column()
    order: number;

    @ManyToOne(() => Project, project => project.attachments)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @OneToMany(() => Log, log => log.attachment, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'attachment_id' })
    logs: Log[];

    @OneToMany(() => Share, share => share.attachment)
    @JoinColumn({ name: 'attachment_id' })
    shares: Share[];
}