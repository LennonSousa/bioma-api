import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingMemberView from '../views/licensingMemberView';
import { LicensingMembersRepository } from '../repositories/LicensingMembersRepository';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;
        const { limit = 6, page = 1 } = request.query;

        const licensingMembersRepository = getCustomRepository(LicensingMembersRepository);

        const licensingMembers = await licensingMembersRepository.find(
            {
                where: { user: id },
                relations: [
                    'licensing',
                    'licensing.customer',
                    'licensing.property',
                    'licensing.authorization',
                    'licensing.status',
                    'user',
                ],
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            }
        );

        const totalMembers = await licensingMembersRepository.count(
            {
                where: { user: id },
            }
        );

        const totalPages = Math.ceil(totalMembers / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(licensingMemberView.renderMany(licensingMembers));
    },

    async create(request: Request, response: Response) {
        const {
            licensing,
            user,
        } = request.body;

        const licensingMembersRepository = getCustomRepository(LicensingMembersRepository);

        const data = {
            licensing,
            user,
        };

        const schema = Yup.object().shape({
            licensing: Yup.string().required(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingMember = licensingMembersRepository.create(data);

        await licensingMembersRepository.save(licensingMember);

        return response.status(201).json(licensingMemberView.render(licensingMember));
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingMembersRepository = getCustomRepository(LicensingMembersRepository);

        await licensingMembersRepository.delete(id);

        return response.status(204).send();
    }
}