import { EntityRepository, Repository } from 'typeorm';

import PropertyMembersModel from '../models/PropertyMembersModel';

@EntityRepository(PropertyMembersModel)
class PropertyMembersRepository extends Repository<PropertyMembersModel> { }

export { PropertyMembersRepository };