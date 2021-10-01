import { EntityRepository, Repository } from 'typeorm';

import SharesProjectAttachmentsModel from '../models/SharesProjectAttachmentModel';

@EntityRepository(SharesProjectAttachmentsModel)
class SharesProjectAttachmentsRepository extends Repository<SharesProjectAttachmentsModel> { }

export { SharesProjectAttachmentsRepository };