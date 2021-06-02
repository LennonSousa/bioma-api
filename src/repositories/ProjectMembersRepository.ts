import { EntityRepository, Repository } from 'typeorm';

import ProjectMembersModel from '../models/ProjectMembersModel';

@EntityRepository(ProjectMembersModel)
class ProjectMembersRepository extends Repository<ProjectMembersModel> { }

export { ProjectMembersRepository };