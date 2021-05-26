import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerView from '../views/customerView';
import { CustomersRepository } from '../repositories/CustomersRepository';

export default {
    async index(request: Request, response: Response) {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.find({
            order: {
                created_at: "ASC"
            }
        });

        return response.json(customerView.renderMany(customers));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOneOrFail(id, {
            relations: [
                'docs',
                'docs.doc',
                'properties',
                'projects',
                'licensings',
                'attachments',
                'attachments.customer',
            ]
        });

        return response.json(customerView.render(customer));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            address,
            city,
            state,
            owner,
            notes,
            warnings,
            birth,
            docs,
        } = request.body;

        const customersRepository = getCustomRepository(CustomersRepository);

        const data = {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            address,
            city,
            state,
            owner,
            notes,
            warnings,
            birth,
            created_by: 'ex',
            docs,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired(),
            contacts: Yup.string().notRequired(),
            email: Yup.string().notRequired(),
            address: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            owner: Yup.string().notRequired(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            birth: Yup.date().required(),
            created_by: Yup.string().required(),
            docs: Yup.array(
                Yup.object().shape({
                    path: Yup.string().notRequired(),
                    received_at: Yup.date().notRequired(),
                    checked: Yup.boolean().notRequired(),
                    doc: Yup.string().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.save(customer);

        return response.status(201).json(customerView.render(customer));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            address,
            city,
            state,
            owner,
            notes,
            warnings,
            birth,
        } = request.body;

        const customersRepository = getCustomRepository(CustomersRepository);

        const data = {
            name,
            document,
            phone,
            cellphone,
            contacts,
            email,
            address,
            city,
            state,
            owner,
            notes,
            warnings,
            birth,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired(),
            contacts: Yup.string().notRequired(),
            email: Yup.string().notRequired(),
            address: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            owner: Yup.string().notRequired(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            birth: Yup.date().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.update(id, customer);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customersRepository = getCustomRepository(CustomersRepository);

        await customersRepository.delete(id);

        return response.status(204).send();
    }
}