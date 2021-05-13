import CustomerDoc from '../models/CustomerDocsModel';
import customerView from './customerView';
import docCustomerView from './docCustomerView';

export default {
    render(customerDoc: CustomerDoc) {
        return {
            id: customerDoc.id,
            path: customerDoc.path,
            received_at: customerDoc.received_at,
            checked: customerDoc.checked,
            customer: customerDoc.customer && customerView.render(customerDoc.customer),
            doc: customerDoc.doc && docCustomerView.render(customerDoc.doc),
        }
    },

    renderMany(customerDocs: CustomerDoc[]) {
        return customerDocs.map(customerDoc => this.render(customerDoc));
    }
}