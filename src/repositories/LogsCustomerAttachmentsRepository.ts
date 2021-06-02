import { EntityRepository, Repository } from 'typeorm';

import LogsCustomerAttachmentsModel from '../models/LogsCustomerAttachmentsModel';

@EntityRepository(LogsCustomerAttachmentsModel)
class LogsCustomerAttachmentsRepository extends Repository<LogsCustomerAttachmentsModel> { }

export { LogsCustomerAttachmentsRepository };