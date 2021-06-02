import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import userRoleView from '../views/userRoleView';
import { UsersRolesRepository } from '../repositories/UsersRolesRepository';

let role: 'customers' | 'licensings' | 'properties' | 'projects' | 'banks' | 'users';
let grant: 'view' | 'view_self' | 'create' | 'update' | 'update_self' | 'remove';

const grants = ['view', 'view_self', 'create', 'update', 'update_self', 'remove']

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;

        const userRolesRepository = getCustomRepository(UsersRolesRepository);

        const userRoles = await userRolesRepository.find(
            {
                where: { user: id }
            }
        );

        return response.json(userRoleView.renderMany(userRoles));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const roleRepository = getCustomRepository(UsersRolesRepository);

        const role = await roleRepository.findOneOrFail(id);

        return response.json(userRoleView.render(role));
    },

    generate(request: Request, response: Response) {
        const userRoles = [
            {
                role: 'customers',
                grants,
            },
            {
                role: 'properties',
                grants,
            },
            {
                role: 'projects',
                grants,
            },
            {
                role: 'licensings',
                grants,
            },
            {
                role: 'institutions',
                grants,
            },
            {
                role: 'banks',
                grants,
            },
            {
                role: 'users',
                grants,
            }
        ];

        return response.json(userRoles);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            view,
            view_self,
            crete,
            update,
            update_self,
            remove,
        } = request.body;

        const usersRolesRepository = getCustomRepository(UsersRolesRepository);

        const data = {
            view,
            view_self,
            crete,
            update,
            update_self,
            remove,
        };

        const schema = Yup.object().shape({
            role: Yup.string().required(),
            view: Yup.boolean().notRequired(),
            view_self: Yup.boolean().notRequired(),
            create: Yup.boolean().notRequired(),
            update: Yup.boolean().notRequired(),
            update_self: Yup.boolean().notRequired(),
            remove: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const role = usersRolesRepository.create(data);

        await usersRolesRepository.update(id, role);

        return response.status(204).json();
    },

    async can(userId: string, userRole: typeof role, userGrant: typeof grant) {
        const usersRolesRepository = getCustomRepository(UsersRolesRepository);

        const role = await usersRolesRepository.findOne({
            where: { user: userId, role: userRole, [userGrant]: true }
        });

        if (role) return true;

        return false;
    }
}