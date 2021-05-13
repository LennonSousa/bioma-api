import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import docCustomerView from '../views/docCustomerView';
import { DocsCustomerRepository } from '../repositories/DocsCustomerRepository';

export default {
    async index(request: Request, response: Response) {
        const docsCustomerRepository = getCustomRepository(DocsCustomerRepository);

        const docsCustomer = await docsCustomerRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(docCustomerView.renderMany(docsCustomer));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const docsCustomerRepository = getCustomRepository(DocsCustomerRepository);

        const docCustomer = await docsCustomerRepository.findOneOrFail(id, {
            relations: [
                'docs',
            ]
        });

        return response.json(docCustomerView.render(docCustomer));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            active,
            order,
        } = request.body;

        const docsCustomerRepository = getCustomRepository(DocsCustomerRepository);

        const data = {
            name,
            active,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            active: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docCustomer = docsCustomerRepository.create(data);

        await docsCustomerRepository.save(docCustomer);

        return response.status(201).json(docCustomerView.render(docCustomer));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            active,
            order,
        } = request.body;

        const docsCustomerRepository = getCustomRepository(DocsCustomerRepository);

        const data = {
            name,
            active,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            active: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docCustomer = docsCustomerRepository.create(data);

        await docsCustomerRepository.update(id, docCustomer);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const docsCustomerRepository = getCustomRepository(DocsCustomerRepository);

        await docsCustomerRepository.delete(id);

        return response.status(204).send();
    }
}