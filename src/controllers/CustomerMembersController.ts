import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerMemberView from '../views/customerMemberView';
import { CustomerMembersRepository } from '../repositories/CustomerMembersRepository';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;
        const { limit = 6, page = 1 } = request.query;

        const customerMembersRepository = getCustomRepository(CustomerMembersRepository);

        const customerMembers = await customerMembersRepository.find(
            {
                where: { user: id },
                relations: [
                    'customer',
                    'customer.type',
                    'user',
                ],
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            }
        );

        const totalMembers = await customerMembersRepository.count(
            {
                where: { user: id },
            }
        );

        const totalPages = Math.ceil(totalMembers / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(customerMemberView.renderMany(customerMembers));
    },

    async create(request: Request, response: Response) {
        const {
            customer,
            user,
        } = request.body;

        const customerMembersRepository = getCustomRepository(CustomerMembersRepository);

        const data = {
            customer,
            user,
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerMember = customerMembersRepository.create(data);

        await customerMembersRepository.save(customerMember);

        return response.status(201).json(customerMemberView.render(customerMember));
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customerMembersRepository = getCustomRepository(CustomerMembersRepository);

        await customerMembersRepository.delete(id);

        return response.status(204).send();
    }
}