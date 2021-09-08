import { EntityRepository, Repository } from 'typeorm';

import LogsLicensingsModel from '../models/LogsLicensingsModel';

@EntityRepository(LogsLicensingsModel)
class LogsLicensingsRepository extends Repository<LogsLicensingsModel> { }

export { LogsLicensingsRepository };