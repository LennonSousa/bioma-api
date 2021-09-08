import { EntityRepository, Repository } from 'typeorm';

import LogsPropertiesModel from '../models/LogsPropertiesModel';

@EntityRepository(LogsPropertiesModel)
class LogsPropertiesRepository extends Repository<LogsPropertiesModel> { }

export { LogsPropertiesRepository };