import DocCustomer from '../models/DocsCustomerModel';
import customerDocView from './customerDocView';

export default {
    render(docCustomer: DocCustomer) {
        return {
            id: docCustomer.id,
            name: docCustomer.name,
            active: docCustomer.active,
            order: docCustomer.order,
            docs: customerDocView.renderMany(docCustomer.docs),
        }
    },

    renderMany(docCustomers: DocCustomer[]) {
        return docCustomers.map(docCustomer => this.render(docCustomer));
    }
}