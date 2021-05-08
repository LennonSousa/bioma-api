import { EntityRepository, Repository } from 'typeorm';

import CustomerDocsModel from '../models/CustomerDocsModel';

@EntityRepository(CustomerDocsModel)
class CustomerDocsRepository extends Repository<CustomerDocsModel> { }

export { CustomerDocsRepository };