import { EntityRepository, Repository } from 'typeorm';

import PropertiesModel from '../models/PropertiesModel';

@EntityRepository(PropertiesModel)
class PropertiesRepository extends Repository<PropertiesModel> { }

export { PropertiesRepository };