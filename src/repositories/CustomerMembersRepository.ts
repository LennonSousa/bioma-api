import { EntityRepository, Repository } from 'typeorm';

import CustomerMembersModel from '../models/CustomerMembersModel';

@EntityRepository(CustomerMembersModel)
class CustomerMembersRepository extends Repository<CustomerMembersModel> { }

export { CustomerMembersRepository };