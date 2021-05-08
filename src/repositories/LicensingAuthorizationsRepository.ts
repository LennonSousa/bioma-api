import { EntityRepository, Repository } from 'typeorm';

import LicensingAuthorizationsModel from '../models/LicensingAuthorizationsModel';

@EntityRepository(LicensingAuthorizationsModel)
class LicensingAuthorizationsRepository extends Repository<LicensingAuthorizationsModel> { }

export { LicensingAuthorizationsRepository };