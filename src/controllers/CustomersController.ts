import { Request, Response } from 'express';
import { getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import customerView from '../views/customerView';
import { CustomersRepository } from '../repositories/CustomersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { limit = 10, page = 1, name } = request.query;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customersRepository = getCustomRepository(CustomersRepository);

        if (name) {
            const customers = await customersRepository.find({
                where: { name: Like(`%${name}%`) },
                relations: [
                    'type',
                ],
                order: {
                    name: "ASC"
                },
            });

            return response.json(customerView.renderMany(customers));
        }

        const totalCustomers = await customersRepository.count();

        const totalPages = Math.ceil(totalCustomers / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        const customers = await customersRepository.find({
            relations: [
                'type',
            ],
            order: {
                name: "ASC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
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
                'type',
                'docs',
                'docs.doc',
                'attachments',
                'attachments.customer',
                'attachments.logs',
                'members',
                'members.user'
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
            warnings_text,
            birth,
            type,
            docs,
            members,
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
            warnings_text,
            birth,
            type,
            created_by: user.name,
            docs,
            members,
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
            warnings: Yup.boolean().notRequired(),
            warnings_text: Yup.string().notRequired().nullable(),
            birth: Yup.date().required(),
            type: Yup.string().required(),
            created_by: Yup.string().required(),
            docs: Yup.array(
                Yup.object().shape({
                    path: Yup.string().notRequired(),
                    received_at: Yup.date().notRequired(),
                    checked: Yup.boolean().notRequired(),
                    doc: Yup.string().required(),
                })
            ),
            members: Yup.array(
                Yup.object().shape({
                    user: Yup.string().required(),
                })
            ).required(),
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
            warnings_text,
            birth,
            type,
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
            warnings_text,
            birth,
            type,
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
            warnings: Yup.boolean().notRequired(),
            warnings_text: Yup.string().notRequired().nullable(),
            birth: Yup.date().required(),
            type: Yup.string().required(),
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