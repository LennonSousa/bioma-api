import Role from '../models/UsersRolesModel';

export default {
    render(role: Role) {
        return {
            id: role.id,
            role: role.role,
            view: role.view,
            create: role.create,
            edit: role.edit,
            edit_self: role.edit_self,
            delete: role.delete,
        }
    },

    renderMany(roles: Role[]) {
        return roles.map(role => this.render(role));
    }
}