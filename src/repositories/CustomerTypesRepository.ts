import { EntityRepository, Repository } from 'typeorm';

import CustomerTypesModel from '../models/CustomerTypesModel';

@EntityRepository(CustomerTypesModel)
class CustomerTypesRepository extends Repository<CustomerTypesModel> { }

export { CustomerTypesRepository };