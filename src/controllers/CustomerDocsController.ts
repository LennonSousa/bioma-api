import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerDocView from '../views/customerDocView';
import { CustomerDocsRepository } from '../repositories/CustomerDocsRepository';

export default {
    async index(request: Request, response: Response) {
        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        const docsCustomer = await docsCustomerRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(customerDocView.renderMany(docsCustomer));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        const docCustomer = await docsCustomerRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'doc',
            ]
        });

        return response.json(customerDocView.render(docCustomer));
    },

    async create(request: Request, response: Response) {
        const {
            path,
            received_at,
            checked,
            customer,
            doc,
        } = request.body;

        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        const data = {
            path,
            received_at,
            checked,
            customer,
            doc,
        };

        const schema = Yup.object().shape({
            path: Yup.string().notRequired(),
            received_at: Yup.date().notRequired(),
            checked: Yup.boolean().notRequired(),
            customer: Yup.string().required(),
            doc: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docCustomer = docsCustomerRepository.create(data);

        await docsCustomerRepository.save(docCustomer);

        return response.status(201).json(customerDocView.render(docCustomer));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            path,
            received_at,
            checked,
            customer,
        } = request.body;

        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        const data = {
            path,
            received_at,
            checked,
            customer,
        };

        const schema = Yup.object().shape({
            path: Yup.string().notRequired(),
            received_at: Yup.date().notRequired(),
            checked: Yup.boolean().notRequired(),
            customer: Yup.string().required(),
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

        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        await docsCustomerRepository.delete(id);

        return response.status(204).send();
    }
}