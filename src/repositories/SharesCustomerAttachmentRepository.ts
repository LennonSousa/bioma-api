import { EntityRepository, Repository } from 'typeorm';

import SharesCustomerAttachmentsModel from '../models/SharesCustomerAttachmentModel';

@EntityRepository(SharesCustomerAttachmentsModel)
class SharesCustomerAttachmentsRepository extends Repository<SharesCustomerAttachmentsModel> { }

export { SharesCustomerAttachmentsRepository };