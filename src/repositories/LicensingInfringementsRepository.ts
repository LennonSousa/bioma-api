import { EntityRepository, Repository } from 'typeorm';

import LicensingInfringementsModel from '../models/LicensingInfringementsModel';

@EntityRepository(LicensingInfringementsModel)
class LicensingInfringementsRepository extends Repository<LicensingInfringementsModel> { }

export { LicensingInfringementsRepository };