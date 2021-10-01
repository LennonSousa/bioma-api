import { EntityRepository, Repository } from 'typeorm';

import SharesPropertyAttachmentsModel from '../models/SharesPropertyAttachmentModel';

@EntityRepository(SharesPropertyAttachmentsModel)
class SharesPropertyAttachmentsRepository extends Repository<SharesPropertyAttachmentsModel> { }

export { SharesPropertyAttachmentsRepository };