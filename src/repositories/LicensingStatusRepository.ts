import { EntityRepository, Repository } from 'typeorm';

import LicensingStatusModel from '../models/LicensingStatusModel';

@EntityRepository(LicensingStatusModel)
class LicensingStatusRepository extends Repository<LicensingStatusModel> { }

export { LicensingStatusRepository };