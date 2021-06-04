import LicensingAttachment from '../models/LicensingAttachmentsModel';
import licensingView from './licensingView';

export default {
    render(licensingAttachment: LicensingAttachment) {
        return {
            id: licensingAttachment.id,
            name: licensingAttachment.name,
            path: licensingAttachment.path,
            received_at: licensingAttachment.received_at,
            expire: licensingAttachment.expire,
            expire_at: licensingAttachment.expire_at,
            schedule: licensingAttachment.schedule,
            schedule_at: licensingAttachment.schedule_at,
            licensing: licensingAttachment.licensing && licensingView.render(licensingAttachment.licensing),
        }
    },

    renderDownload(licensingAttachment: LicensingAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/licensings/${licensingAttachment.licensing.id}/${licensingAttachment.path}`,
        }
    },

    renderMany(licensingAttachments: LicensingAttachment[]) {
        return licensingAttachments.map(licensingAttachment => this.render(licensingAttachment));
    }
}