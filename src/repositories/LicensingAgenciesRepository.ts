import { EntityRepository, Repository } from 'typeorm';

import LicensingAgenciesModel from '../models/LicensingAgenciesModel';

@EntityRepository(LicensingAgenciesModel)
class LicensingAgenciesRepository extends Repository<LicensingAgenciesModel> { }

export { LicensingAgenciesRepository };