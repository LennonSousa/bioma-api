import { EntityRepository, Repository } from 'typeorm';

import LogsPropertyAttachmentsModel from '../models/LogsPropertyAttachmentsModel';

@EntityRepository(LogsPropertyAttachmentsModel)
class LogsPropertyAttachmentsRepository extends Repository<LogsPropertyAttachmentsModel> { }

export { LogsPropertyAttachmentsRepository };