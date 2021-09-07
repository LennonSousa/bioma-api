import Log from '../models/LogsProjectAttachmentsModel';
import projectAttachmentView from './projectAttachmentView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            user: log.user,
            action: log.action,
            client_ip: log.client_ip,
            attachment: log.attachment && projectAttachmentView.render(log.attachment),
        }
    },

    renderMany(logs: Log[]) {
        const logsSorted = logs.sort((a, b) => b.accessed_at.getTime() - a.accessed_at.getTime());

        return logsSorted.map(log => this.render(log));
    }
}