import { EntityRepository, Repository } from 'typeorm';

import CustomerAttachmentsModel from '../models/CustomerAttachmentsModel';

@EntityRepository(CustomerAttachmentsModel)
class CustomerAttachmentsRepository extends Repository<CustomerAttachmentsModel> { }

export { CustomerAttachmentsRepository };