import { EntityRepository, Repository } from 'typeorm';

import LicensingMembersModel from '../models/LicensingMembersModel';

@EntityRepository(LicensingMembersModel)
class LicensingMembersRepository extends Repository<LicensingMembersModel> { }

export { LicensingMembersRepository };