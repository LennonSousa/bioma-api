import { EntityRepository, Repository } from 'typeorm';

import PropertyAttachmentsModel from '../models/PropertyAttachmentsModel';

@EntityRepository(PropertyAttachmentsModel)
class PropertyAttachmentsRepository extends Repository<PropertyAttachmentsModel> { }

export { PropertyAttachmentsRepository };