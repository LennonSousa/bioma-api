import { EntityRepository, Repository } from 'typeorm';

import LogsCustomersModel from '../models/LogsCustomersModel';

@EntityRepository(LogsCustomersModel)
class LogsCustomersRepository extends Repository<LogsCustomersModel> { }

export { LogsCustomersRepository };