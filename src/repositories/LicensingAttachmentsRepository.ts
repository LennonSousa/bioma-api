import { EntityRepository, Repository } from 'typeorm';

import LicensingAttachmentsModel from '../models/LicensingAttachmentsModel';

@EntityRepository(LicensingAttachmentsModel)
class LicensingAttachmentsRepository extends Repository<LicensingAttachmentsModel> { }

export { LicensingAttachmentsRepository };