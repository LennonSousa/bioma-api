import { EntityRepository, Repository } from 'typeorm';

import LogsLicensingAttachmentsModel from '../models/LogsLicensingAttachmentsModel';

@EntityRepository(LogsLicensingAttachmentsModel)
class LogsLicensingAttachmentsRepository extends Repository<LogsLicensingAttachmentsModel> { }

export { LogsLicensingAttachmentsRepository };