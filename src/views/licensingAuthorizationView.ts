import LicensingAuthorization from '../models/LicensingAuthorizationsModel';

export default {
    render(licensingAuthorization: LicensingAuthorization) {
        return {
            id: licensingAuthorization.id,
            department: licensingAuthorization.department,
            activity: licensingAuthorization.activity,
            sub_activity: licensingAuthorization.sub_activity,
            order: licensingAuthorization.order,
        }
    },

    renderMany(licensingAuthorization: LicensingAuthorization[]) {
        return licensingAuthorization.map(licensingAuthorization => this.render(licensingAuthorization));
    }
}