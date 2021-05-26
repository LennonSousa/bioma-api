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
            customer: customerAttachment.customer && customerView.render(customerAttachment.customer),
        }
    },

    renderDownload(customerAttachment: CustomerAttachment) {
        return {
            path: `uploads/attachments/${customerAttachment.path}`,
        }
    },

    renderMany(customerAttachments: CustomerAttachment[]) {
        return customerAttachments.map(customerAttachment => this.render(customerAttachment));
    }
}