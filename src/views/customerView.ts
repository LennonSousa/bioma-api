import Customer from '../models/CustomersModel';
import propertyView from './propertyView';
import projectView from './projectView';
import customerDocView from './customerDocView';
import licensingView from './licensingView';
import attachmentView from './customerAttachmentView';

export default {
    render(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            document: customer.document,
            phone: customer.phone,
            cellphone: customer.cellphone,
            contacts: customer.contacts,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            owner: customer.owner,
            notes: customer.notes,
            warnings: customer.warnings,
            birth: customer.birth,
            created_at: customer.created_at,
            docs: customerDocView.renderMany(customer.docs),
            properties: propertyView.renderMany(customer.properties),
            projects: projectView.renderMany(customer.projects),
            licensings: licensingView.renderMany(customer.licensings),
            attachments: attachmentView.renderMany(customer.attachments),
        }
    },

    renderMany(customers: Customer[]) {
        return customers.map(customer => this.render(customer));
    }
}