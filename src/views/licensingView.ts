import Licensing from '../models/LicensingsModel';
import customerView from './customerView';

export default {
    render(licensing: Licensing) {
        return {
            id: licensing.id,
            licensing_number: licensing.licensing_number,
            expire: licensing.expire,
            renovation: licensing.renovation,
            deadline: licensing.deadline,
            process_number: licensing.process_number,
            created_at: licensing.created_at,
            updated_at: licensing.updated_at,
            customer: customerView.render(licensing.customer),
            property: licensing.property,
            infringement: licensing.infringement,
            authorization: licensing.authorization,
            agency: licensing.agency,
            status: licensing.status,
            events: licensing.events,
        }
    },

    renderMany(licensings: Licensing[]) {
        return licensings.map(licensing => this.render(licensing));
    }
}