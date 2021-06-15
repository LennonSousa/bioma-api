import User from '../models/UsersModel';
import userRoleView from './userRoleView';
import notificationView from './notificationView';
import customerMemberView from './customerMemberView';
import licensingMemberView from './licensingMemberView';
import projectMemberView from './projectMemberView';
import propertyMemberView from './propertyMemberView';

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            active: user.active,
            paused: user.paused,
            sudo: user.sudo,
            created_at: user.created_at,
            roles: user.roles ? userRoleView.renderMany(user.roles) : [],
            notifications: user.notifications ? notificationView.renderMany(user.notifications) : [],
            customerMembers: user.customerMembers ? customerMemberView.renderMany(user.customerMembers) : [],
            licensingMembers: user.licensingMembers ? licensingMemberView.renderMany(user.licensingMembers) : [],
            projectMembers: user.projectMembers ? projectMemberView.renderMany(user.projectMembers) : [],
            propertyMembers: user.propertyMembers ? propertyMemberView.renderMany(user.propertyMembers) : [],
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}