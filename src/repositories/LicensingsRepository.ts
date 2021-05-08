import { EntityRepository, Repository } from 'typeorm';

import LicensingsModel from '../models/LicensingsModel';

@EntityRepository(LicensingsModel)
class LicensingsRepository extends Repository<LicensingsModel> { }

export { LicensingsRepository };