import Log from '../models/LogsLicensingAttachmentsModel';
import licensingAttachmentView from './licensingAttachmentView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            user: log.user,
            action: log.action,
            attachment: log.attachment && licensingAttachmentView.render(log.attachment),
        }
    },

    renderMany(logs: Log[]) {
        return logs.map(log => this.render(log));
    }
}