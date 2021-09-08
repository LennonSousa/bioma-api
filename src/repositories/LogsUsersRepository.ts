import { EntityRepository, Repository } from 'typeorm';

import LogsUsersModel from '../models/LogsUsersModel';

@EntityRepository(LogsUsersModel)
class LogsUsersRepository extends Repository<LogsUsersModel> { }

export { LogsUsersRepository };