import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import propertyMemberView from '../views/propertyMemberView';
import { PropertyMembersRepository } from '../repositories/PropertyMembersRepository';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;
        const { limit = 6, page = 1 } = request.query;

        const propertyMembersRepository = getCustomRepository(PropertyMembersRepository);

        const propertyMembers = await propertyMembersRepository.find(
            {
                where: { user: id },
                relations: [
                    'property',
                    'property.customer',
                    'user',
                ],
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            }
        );

        const totalMembers = await propertyMembersRepository.count(
            {
                where: { user: id },
            }
        );

        const totalPages = Math.ceil(totalMembers / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(propertyMemberView.renderMany(propertyMembers));
    },

    async create(request: Request, response: Response) {
        const {
            property,
            user,
        } = request.body;

        const propertyMembersRepository = getCustomRepository(PropertyMembersRepository);

        const data = {
            property,
            user,
        };

        const schema = Yup.object().shape({
            property: Yup.string().required(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const propertyMember = propertyMembersRepository.create(data);

        await propertyMembersRepository.save(propertyMember);

        return response.status(201).json(propertyMemberView.render(propertyMember));
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const propertyMembersRepository = getCustomRepository(PropertyMembersRepository);

        await propertyMembersRepository.delete(id);

        return response.status(204).send();
    }
}