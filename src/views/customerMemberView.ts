import CustomerMember from '../models/CustomerMembersModel';
import customerView from './customerView';
import userView from './userView';

export default {
    render(customerMember: CustomerMember) {
        return {
            id: customerMember.id,
            customer: customerMember.customer && customerView.render(customerMember.customer),
            user: customerMember.user && userView.render(customerMember.user),
        }
    },

    renderMany(customerMembers: CustomerMember[]) {
        return customerMembers.map(customerMember => this.render(customerMember));
    }
}