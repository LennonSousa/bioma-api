import CustomerAttachment from '../models/CustomerAttachmentsModel';
import customerView from './customerView';

export default {
    render(customerAttachment: CustomerAttachment) {
        return {
            id: customerAttachment.id,
            name: customerAttachment.name,
            path: customerAttachment.path,
            received_at: customerAttachment.received_at,
            expire: customerAttachment.expire,
            expire_at: customerAttachment.expire_at,
            renewal: customerAttachment.renewal,
            customer: customerView.render(customerAttachment.customer),
        }
    },

    renderMany(customerAttachments: CustomerAttachment[]) {
        return customerAttachments.map(customerAttachment => this.render(customerAttachment));
    }
}