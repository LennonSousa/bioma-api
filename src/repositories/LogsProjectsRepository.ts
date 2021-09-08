import { EntityRepository, Repository } from 'typeorm';

import LogsProjectsModel from '../models/LogsProjectsModel';

@EntityRepository(LogsProjectsModel)
class LogsProjectsRepository extends Repository<LogsProjectsModel> { }

export { LogsProjectsRepository };