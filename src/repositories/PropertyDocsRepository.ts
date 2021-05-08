import { EntityRepository, Repository } from 'typeorm';

import PropertyDocsModel from '../models/PropertyDocsModel';

@EntityRepository(PropertyDocsModel)
class PropertyDocsRepository extends Repository<PropertyDocsModel> { }

export { PropertyDocsRepository };