import { EntityRepository, Repository } from 'typeorm';

import CustomersModel from '../models/CustomersModel';

@EntityRepository(CustomersModel)
class CustomersRepository extends Repository<CustomersModel> { }

export { CustomersRepository };