import Licensing from '../models/LicensingsModel';
import customerView from './customerView';
import propertyView from './propertyView';
import licensingInfringmentView from './licensingInfringementView';
import licensingAuthorizationView from './licensingAuthorizationView';
import licensingAgencyView from './licensingAgencyView';
import licensingStatusView from './licensingStatusView';
import projectTypeView from './projectTypeView';
import eventLicensingView from './eventLicensingView';
import attachmentView from './licensingAttachmentView';
import memberView from './licensingMemberView';
import logLicensingView from './logLicensingView';

export default {
    render(licensing: Licensing) {
        return {
            id: licensing.id,
            licensing_number: licensing.licensing_number,
            expire: licensing.expire,
            renovation: licensing.renovation,
            deadline: licensing.deadline,
            process_number: licensing.process_number,
            value: licensing.value,
            deal: licensing.deal,
            paid: licensing.paid,
            paid_date: licensing.paid_date,
            contract: licensing.contract,
            notes: licensing.notes,
            created_by: licensing.created_by,
            created_at: licensing.created_at,
            updated_by: licensing.updated_by,
            updated_at: licensing.updated_at,
            customer: licensing.customer && customerView.render(licensing.customer),
            property: licensing.property && propertyView.render(licensing.property),
            infringement: licensing.infringement && licensingInfringmentView.render(licensing.infringement),
            authorization: licensing.authorization && licensingAuthorizationView.render(licensing.authorization),
            agency: licensing.agency && licensingAgencyView.render(licensing.agency),
            status: licensing.status && licensingStatusView.render(licensing.status),
            type: licensing.type && projectTypeView.render(licensing.type),
            events: licensing.events ? eventLicensingView.renderMany(licensing.events) : [],
            attachments: licensing.attachments ? attachmentView.renderMany(licensing.attachments) : [],
            members: licensing.members ? memberView.renderMany(licensing.members) : [],
            logs: licensing.logs ? logLicensingView.renderMany(licensing.logs) : [],
        }
    },

    renderMany(licensings: Licensing[]) {
        return licensings.map(licensing => this.render(licensing));
    }
}