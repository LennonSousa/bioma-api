import LicensingAttachment from '../models/LicensingAttachmentsModel';
import licensingView from './licensingView';
import logLicensingAttachment from './logLicensingAttachmentView';

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
            order: licensingAttachment.order,
            licensing: licensingAttachment.licensing && licensingView.render(licensingAttachment.licensing),
            logs: licensingAttachment.logs ? logLicensingAttachment.renderMany(licensingAttachment.logs) : [],
        }
    },

    renderDownload(licensingAttachment: LicensingAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/licensings/${licensingAttachment.licensing.id}/${licensingAttachment.path}`,
        }
    },

    renderMany(licensingAttachments: LicensingAttachment[]) {
        const licensingAttachmentsSorted = licensingAttachments.sort((a, b) => a.order - b.order);

        return licensingAttachmentsSorted.map(licensingAttachment => this.render(licensingAttachment));
    }
}