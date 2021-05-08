import { EntityRepository, Repository } from 'typeorm';

import DocsPropertyModel from '../models/DocsPropertyModel';

@EntityRepository(DocsPropertyModel)
class DocsPropertyRepository extends Repository<DocsPropertyModel> { }

export { DocsPropertyRepository };