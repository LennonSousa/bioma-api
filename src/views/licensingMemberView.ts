import LicensingMember from '../models/LicensingMembersModel';
import licensingView from './licensingView';
import userView from './userView';

export default {
    render(licensingMember: LicensingMember) {
        return {
            id: licensingMember.id,
            licensing: licensingMember.licensing && licensingView.render(licensingMember.licensing),
            user: licensingMember.user && userView.render(licensingMember.user),
        }
    },

    renderMany(licensingMembers: LicensingMember[]) {
        return licensingMembers.map(licensingMember => this.render(licensingMember));
    }
}