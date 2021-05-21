import Bank from '../models/BanksModel';
import institutionView from './institutionView';
import projectView from './projectView';

export default {
    render(bank: Bank) {
        return {
            id: bank.id,
            agency: bank.agency,
            address: bank.address,
            city: bank.city,
            state: bank.state,
            sector: bank.sector,
            department: bank.department,
            phone: bank.phone,
            cellphone: bank.cellphone,
            institution: bank.institution && institutionView.render(bank.institution),
            projects: bank.projects ? projectView.renderMany(bank.projects) : [],
        }
    },

    renderMany(banks: Bank[]) {
        return banks.map(bank => this.render(bank));
    }
}