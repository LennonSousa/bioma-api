import CustomerAttachment from '../models/CustomerAttachmentsModel';
import customerView from './customerView';
import logCustomerAttachment from './logCustomerAttachmentView';

require('dotenv/config');

export default {
    render(customerAttachment: CustomerAttachment) {
        return {
            id: customerAttachment.id,
            name: customerAttachment.name,
            path: customerAttachment.path,
            received_at: customerAttachment.received_at,
            expire: customerAttachment.expire,
            expire_at: customerAttachment.expire_at,
            schedule: customerAttachment.schedule,
            schedule_at: customerAttachment.schedule_at,
            order: customerAttachment.order,
            customer: customerAttachment.customer && customerView.render(customerAttachment.customer),
            logs: customerAttachment.logs ? logCustomerAttachment.renderMany(customerAttachment.logs) : [],
        }
    },

    renderDownload(customerAttachment: CustomerAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/customers/${customerAttachment.customer.id}/${customerAttachment.path}`,
        }
    },

    renderMany(customerAttachments: CustomerAttachment[]) {
        const customerAttachmentsSorted = customerAttachments.sort((a, b) => a.order - b.order);

        return customerAttachmentsSorted.map(customerAttachment => this.render(customerAttachment));
    }
}