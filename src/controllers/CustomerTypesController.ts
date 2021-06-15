import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerTypeView from '../views/customerTypeView';
import { CustomerTypesRepository } from '../repositories/CustomerTypesRepository';

export default {
    async index(request: Request, response: Response) {
        const customerTypesRepository = getCustomRepository(CustomerTypesRepository);

        const customerTypes = await customerTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(customerTypeView.renderMany(customerTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const customerTypesRepository = getCustomRepository(CustomerTypesRepository);

        const customerType = await customerTypesRepository.findOneOrFail(id, {
            relations: [
                'customers',
            ]
        });

        return response.json(customerTypeView.render(customerType));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const customerTypesRepository = getCustomRepository(CustomerTypesRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerType = customerTypesRepository.create(data);

        await customerTypesRepository.save(customerType);

        return response.status(201).json(customerTypeView.render(customerType));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const customerTypesRepository = getCustomRepository(CustomerTypesRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerType = customerTypesRepository.create(data);

        await customerTypesRepository.update(id, customerType);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customerTypesRepository = getCustomRepository(CustomerTypesRepository);

        await customerTypesRepository.delete(id);

        return response.status(204).send();
    }
}