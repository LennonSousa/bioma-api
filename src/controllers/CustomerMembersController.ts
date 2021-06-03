import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerMemberView from '../views/customerMemberView';
import { CustomerMembersRepository } from '../repositories/CustomerMembersRepository';

export default {
    async index(request: Request, response: Response) {
        const customerMembersRepository = getCustomRepository(CustomerMembersRepository);

        const customerMembers = await customerMembersRepository.find();

        return response.json(customerMemberView.renderMany(customerMembers));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const customerMembersRepository = getCustomRepository(CustomerMembersRepository);

        const customerMember = await customerMembersRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'user',
            ]
        });

        return response.json(customerMemberView.render(customerMember));
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