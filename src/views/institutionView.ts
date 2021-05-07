import Institution from '../models/InstitutionsModel';

export default {
    render(institution: Institution) {
        return {
            id: institution.id,
            name: institution.name,
            banks: institution.banks,
        }
    },

    renderMany(institutions: Institution[]) {
        return institutions.map(institution => this.render(institution));
    }
}