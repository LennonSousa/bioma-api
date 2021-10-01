import { EntityRepository, Repository } from 'typeorm';

import SharesLicensingAttachmentsModel from '../models/SharesLicensingAttachmentModel';

@EntityRepository(SharesLicensingAttachmentsModel)
class SharesLicensingAttachmentsRepository extends Repository<SharesLicensingAttachmentsModel> { }

export { SharesLicensingAttachmentsRepository };