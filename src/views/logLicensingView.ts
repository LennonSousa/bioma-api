import Log from '../models/LogsLicensingsModel';
import licensingView from './licensingView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            user: log.user,
            action: log.action,
            description: log.description,
            client_ip: log.client_ip,
            licensing: log.licensing && licensingView.render(log.licensing),
        }
    },

    renderMany(logs: Log[]) {
        const logsSorted = logs.sort((a, b) => b.accessed_at.getTime() - a.accessed_at.getTime());

        return logsSorted.map(log => this.render(log));
    }
}