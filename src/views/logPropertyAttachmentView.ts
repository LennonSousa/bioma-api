import Log from '../models/LogsPropertyAttachmentsModel';
import propertyAttachmentView from './propertyAttachmentView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            user: log.user,
            action: log.action,
            attachment: log.attachment && propertyAttachmentView.render(log.attachment),
        }
    },

    renderMany(logs: Log[]) {
        return logs.map(log => this.render(log));
    }
}