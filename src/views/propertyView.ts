import Property from '../models/PropertiesModel';
import customerView from './customerView';
import propertyDocView from './propertyDocView';
import projectView from './projectView';

export default {
    render(property: Property) {
        return {
            id: property.id,
            name: property.name,
            registration: property.registration,
            route: property.route,
            city: property.city,
            state: property.state,
            area: property.area,
            notes: property.notes,
            warnings: property.warnings,
            created_at: property.created_at,
            customer: customerView.render(property.customer),
            docs: propertyDocView.renderMany(property.docs),
            projects: projectView.renderMany(property.projects),
        }
    },

    renderMany(properties: Property[]) {
        return properties.map(property => this.render(property));
    }
}