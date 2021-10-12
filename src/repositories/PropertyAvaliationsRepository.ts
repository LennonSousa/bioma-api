import { EntityRepository, Repository } from 'typeorm';

import PropertyAvaliationsModel from '../models/PropertyAvaliationsModel';

@EntityRepository(PropertyAvaliationsModel)
class PropertyAvaliationsRepository extends Repository<PropertyAvaliationsModel> { }

export { PropertyAvaliationsRepository };