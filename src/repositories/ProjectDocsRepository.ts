import { EntityRepository, Repository } from 'typeorm';

import ProjectDocsModel from '../models/ProjectDocsModel';

@EntityRepository(ProjectDocsModel)
class ProjectDocsRepository extends Repository<ProjectDocsModel> { }

export { ProjectDocsRepository };