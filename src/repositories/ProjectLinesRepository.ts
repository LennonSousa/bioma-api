import { EntityRepository, Repository } from 'typeorm';

import ProjectLinesModel from '../models/ProjectLinesModel';

@EntityRepository(ProjectLinesModel)
class ProjectLinesRepository extends Repository<ProjectLinesModel> { }

export { ProjectLinesRepository };