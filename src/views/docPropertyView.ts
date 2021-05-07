import DocProperty from '../models/DocsPropertyModel';
import propertyDocView from './propertyDocView';

export default {
    render(docProperty: DocProperty) {
        return {
            id: docProperty.id,
            name: docProperty.name,
            active: docProperty.active,
            order: docProperty.order,
            docs: propertyDocView.renderMany(docProperty.docs),
        }
    },

    renderMany(docProperties: DocProperty[]) {
        return docProperties.map(docProperty => this.render(docProperty));
    }
}