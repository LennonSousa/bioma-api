import LicensingInfringement from '../models/LicensingInfringementsModel';

export default {
    render(licensingInfringement: LicensingInfringement) {
        return {
            id: licensingInfringement.id,
            name: licensingInfringement.name,
            order: licensingInfringement.order,
        }
    },

    renderMany(licensingInfringements: LicensingInfringement[]) {
        return licensingInfringements.map(licensingInfringement => this.render(licensingInfringement));
    }
}