import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerView from '../views/customerView';
import { CustomersRepository } from '../repositories/CustomersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.find({
            order: {
                created_at: "ASC"
            }
        });

        return response.json(customerView.renderMany(customers));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

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
                'attachments.logs',
            ]
        });

        return response.json(customerView.render(customer));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

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

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

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
            created_by: user.name,
            docs,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired().nullable(),
            contacts: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired().nullable(),
            address: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            owner: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            warnings: Yup.boolean().notRequired().nullable(),
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
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

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
            phone: Yup.string().notRequired().nullable(),
            cellphone: Yup.string().notRequired().nullable(),
            contacts: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired().nullable(),
            address: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            owner: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            warnings: Yup.boolean().notRequired().nullable(),
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
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(CustomersRepository);

        await customersRepository.delete(id);

        return response.status(204).send();
    }
}