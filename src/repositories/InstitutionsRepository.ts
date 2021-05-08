import { EntityRepository, Repository } from 'typeorm';

import InstitutionsModel from '../models/InstitutionsModel';

@EntityRepository(InstitutionsModel)
class InstitutionsRepository extends Repository<InstitutionsModel> { }

export { InstitutionsRepository };