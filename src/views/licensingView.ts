import Licensing from '../models/LicensingsModel';
import customerView from './customerView';
import propertyView from './propertyView';
import licensingInfringmentView from './licensingInfringementView';
import licensingAuthorizationView from './licensingAuthorizationView';
import licensingAgencyView from './licensingAgencyView';
import licensingStatusView from './licensingStatusView';
import eventLicensingView from './eventLicensingView';

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
            property: propertyView.render(licensing.property),
            infringement: licensingInfringmentView.render(licensing.infringement),
            authorization: licensingAuthorizationView.render(licensing.authorization),
            agency: licensingAgencyView.render(licensing.agency),
            status: licensingStatusView.render(licensing.status),
            events: eventLicensingView.renderMany(licensing.events),
        }
    },

    renderMany(licensings: Licensing[]) {
        return licensings.map(licensing => this.render(licensing));
    }
}