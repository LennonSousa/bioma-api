import Log from '../models/LogsUsersModel';
import userView from './userView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            item: log.item,
            description: log.description,
            action: log.action,
            client_ip: log.client_ip,
            user: log.user && userView.render(log.user),
        }
    },

    renderMany(logs: Log[]) {
        const logsSorted = logs.sort((a, b) => b.accessed_at.getTime() - a.accessed_at.getTime());

        return logsSorted.map(log => this.render(log));
    }
}