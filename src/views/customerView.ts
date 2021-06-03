import Customer from '../models/CustomersModel';
import propertyView from './propertyView';
import projectView from './projectView';
import customerDocView from './customerDocView';
import licensingView from './licensingView';
import attachmentView from './customerAttachmentView';
import memberView from './customerMemberView';

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
            created_by: customer.created_by,
            created_at: customer.created_at,
            docs: customer.docs ? customerDocView.renderMany(customer.docs) : [],
            properties: customer.properties ? propertyView.renderMany(customer.properties) : [],
            projects: customer.projects ? projectView.renderMany(customer.projects) : [],
            licensings: customer.licensings ? licensingView.renderMany(customer.licensings) : [],
            attachments: customer.attachments ? attachmentView.renderMany(customer.attachments) : [],
            members: customer.members ? memberView.renderMany(customer.members) : [],
        }
    },

    renderMany(customers: Customer[]) {
        return customers.map(customer => this.render(customer));
    }
}