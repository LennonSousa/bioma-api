import { EntityRepository, Repository } from 'typeorm';

import DocsProjectModel from '../models/DocsProjectModel';

@EntityRepository(DocsProjectModel)
class DocsProjectRepository extends Repository<DocsProjectModel> { }

export { DocsProjectRepository };