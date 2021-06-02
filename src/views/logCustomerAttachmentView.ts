import Log from '../models/LogsCustomerAttachmentsModel';
import customerAttachmentView from './customerAttachmentView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            user: log.user,
            action: log.action,
            attachment: log.attachment && customerAttachmentView.render(log.attachment),
        }
    },

    renderMany(logs: Log[]) {
        return logs.map(log => this.render(log));
    }
}