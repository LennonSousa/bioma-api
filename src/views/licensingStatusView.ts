import LicensingStatus from '../models/LicensingStatusModel';

export default {
    render(licensingStatus: LicensingStatus) {
        return {
            id: licensingStatus.id,
            name: licensingStatus.name,
            order: licensingStatus.order,
        }
    },

    renderMany(licensingStatus: LicensingStatus[]) {
        return licensingStatus.map(licensingState => this.render(licensingState));
    }
}