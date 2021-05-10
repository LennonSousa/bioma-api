import Institution from '../models/InstitutionsModel';
import bankView from './bankView';

export default {
    render(institution: Institution) {
        return {
            id: institution.id,
            name: institution.name,
            banks: institution.banks ? bankView.renderMany(institution.banks) : [],
        }
    },

    renderMany(institutions: Institution[]) {
        return institutions.map(institution => this.render(institution));
    }
}