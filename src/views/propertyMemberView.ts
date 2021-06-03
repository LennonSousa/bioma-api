import PropertyMember from '../models/PropertyMembersModel';
import propertyView from './propertyView';
import userView from './userView';

export default {
    render(propertyMember: PropertyMember) {
        return {
            id: propertyMember.id,
            property: propertyMember.property && propertyView.render(propertyMember.property),
            user: propertyMember.user && userView.render(propertyMember.user),
        }
    },

    renderMany(propertyMembers: PropertyMember[]) {
        return propertyMembers.map(propertyMember => this.render(propertyMember));
    }
}