import { EntityRepository, Repository } from 'typeorm';

import ProjectTypesModel from '../models/ProjectTypesModel';

@EntityRepository(ProjectTypesModel)
class ProjectTypesRepository extends Repository<ProjectTypesModel> { }

export { ProjectTypesRepository };