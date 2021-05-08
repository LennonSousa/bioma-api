import LicensingAgency from '../models/LicensingAgenciesModel';

export default {
    render(licensingAgency: LicensingAgency) {
        return {
            id: licensingAgency.id,
            name: licensingAgency.name,
            order: licensingAgency.order,
        }
    },

    renderMany(licensingAgencies: LicensingAgency[]) {
        return licensingAgencies.map(licensingAgency => this.render(licensingAgency));
    }
}