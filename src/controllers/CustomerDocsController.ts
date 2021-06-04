import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

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
        let {
            received_at,
            checked,
            customer,
            doc,
        } = request.body;

        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        if (checked)
            checked = Yup.boolean().cast(checked);

        let data = {
            path: null,
            received_at,
            checked,
            customer,
            doc,
        };

        if (request.file) {
            const file = request.file as Express.Multer.File;

            data = {
                path: file.filename,
                received_at,
                checked,
                customer,
                doc,
            };
        }

        const schema = Yup.object().shape({
            path: Yup.string().notRequired().nullable(),
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

        let {
            received_at,
            checked,
            customer,
        } = request.body;

        const docsCustomerRepository = getCustomRepository(CustomerDocsRepository);

        if (checked)
            checked = Yup.boolean().cast(checked);

        if (request.file) {
            const doc = await docsCustomerRepository.findOneOrFail(id, {
                relations: [
                    'customer',
                ]
            });

            try {
                fs.rmSync(
                    `${process.env.UPLOADS_DIR}/customers/${doc.customer.id}/${doc.path}`, {
                    maxRetries: 3
                });
            }
            catch (err) {
                console.error("> Error to remove file customer doc: ", err);
            }

            const file = request.file as Express.Multer.File;

            const data = {
                path: file.filename,
                received_at,
                checked,
                customer,
            };
            const schema = Yup.object().shape({
                path: Yup.string().notRequired().nullable(),
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
        }

        const data = {
            received_at,
            checked,
            customer,
        };
        const schema = Yup.object().shape({
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