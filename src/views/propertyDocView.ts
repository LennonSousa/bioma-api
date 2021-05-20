import PropertyDoc from '../models/PropertyDocsModel';
import propertyView from './propertyView';
import docPropertyView from './docPropertyView';

export default {
    render(propertyDoc: PropertyDoc) {
        return {
            id: propertyDoc.id,
            path: propertyDoc.path,
            received_at: propertyDoc.received_at,
            checked: propertyDoc.checked,
            property: propertyDoc.property && propertyView.render(propertyDoc.property),
            doc: propertyDoc.doc && docPropertyView.render(propertyDoc.doc),
        }
    },

    renderMany(customerDocs: PropertyDoc[]) {
        return customerDocs.map(customerDoc => this.render(customerDoc));
    }
}