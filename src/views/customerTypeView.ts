import CustomerType from '../models/CustomerTypesModel';

export default {
    render(customerType: CustomerType) {
        return {
            id: customerType.id,
            name: customerType.name,
            order: customerType.order,
        }
    },

    renderMany(customerTypes: CustomerType[]) {
        return customerTypes.map(customerType => this.render(customerType));
    }
}