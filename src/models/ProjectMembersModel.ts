import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';
import User from './UsersModel';

@Entity('project_members')
export default class ProjectMembersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => Project, project => project.members)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => User, user => user.projectMembers)
    @JoinColumn({ name: 'user_id' })
    user: User;
}