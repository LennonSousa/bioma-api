import Log from '../models/LogsPropertiesModel';
import propertyView from './propertyView';

export default {
    render(log: Log) {
        return {
            id: log.id,
            accessed_at: log.accessed_at,
            user: log.user,
            action: log.action,
            description: log.description,
            client_ip: log.client_ip,
            property: log.property && propertyView.render(log.property),
        }
    },

    renderMany(logs: Log[]) {
        const logsSorted = logs.sort((a, b) => b.accessed_at.getTime() - a.accessed_at.getTime());

        return logsSorted.map(log => this.render(log));
    }
}