import { EntityRepository, Repository } from 'typeorm';

import LogsProjectAttachmentsModel from '../models/LogsProjectAttachmentsModel';

@EntityRepository(LogsProjectAttachmentsModel)
class LogsProjectAttachmentsRepository extends Repository<LogsProjectAttachmentsModel> { }

export { LogsProjectAttachmentsRepository };