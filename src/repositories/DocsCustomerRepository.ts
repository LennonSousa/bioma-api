import { EntityRepository, Repository } from 'typeorm';

import DocsCustomerModel from '../models/DocsCustomerModel';

@EntityRepository(DocsCustomerModel)
class DocsCustomerRepository extends Repository<DocsCustomerModel> { }

export { DocsCustomerRepository };