import { Request, Response } from 'express';
import { Between, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingView from '../views/licensingView';
import { LicensingsRepository } from '../repositories/LicensingsRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import LogsLicensingsController from '../controllers/LogsLicensingsController';
import LogsUsersController from '../controllers/LogsUsersController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, customer, property } = request.query;

        if (! await UsersRolesController.can(user_id, "licensings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        if (start && end) {
            const licensings = await licensingsRepository.find({
                where: { updated_at: Between(start, end) },
                order: {
                    updated_at: "DESC"
                },
                relations: [
                    'customer',
                    'property',
                    'authorization',
                    'status',
                ],
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalItems = await licensingsRepository.count({
                where: { updated_at: Between(start, end) },
            });

            const totalPages = Math.ceil(totalItems / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(licensingView.renderMany(licensings));
        }

        var findConditions = {};

        if (customer) findConditions['customer'] = customer;
        if (property) findConditions['property'] = property;

        const licensings = await licensingsRepository.find({
            where: findConditions,
            order: {
                updated_at: "DESC"
            },
            relations: [
                'customer',
                'property',
                'authorization',
                'status',
            ],
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalItems = await licensingsRepository.count({
            where: findConditions,
        });

        const totalPages = Math.ceil(totalItems / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(licensingView.renderMany(licensings));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const licensing = await licensingsRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'property',
                'infringement',
                'authorization',
                'agency',
                'status',
                'bank',
                'bank.institution',
                'type',
                'line',
                'events',
                'attachments',
                'attachments.licensing',
                'attachments.logs',
                'members',
                'members.user',
                'logs',
            ]
        });

        return response.json(licensingView.render(licensing));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            value,
            deal,
            paid,
            paid_date,
            contract,
            notes,
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
            bank,
            type,
            line,
            members,
        } = request.body;

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            value,
            deal,
            paid,
            paid_date,
            contract,
            notes,
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
            bank,
            type,
            line,
            members,
            created_by: user.name,
            updated_by: user.name,
        };

        const schema = Yup.object().shape({
            licensing_number: Yup.string().notRequired().nullable(),
            expire: Yup.string().notRequired().nullable(),
            renovation: Yup.string().notRequired().nullable(),
            deadline: Yup.string().notRequired().nullable(),
            process_number: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
            property: Yup.string().notRequired().nullable(),
            infringement: Yup.string().notRequired().nullable(),
            authorization: Yup.string().required(),
            agency: Yup.string().required(),
            status: Yup.string().required(),
            type: Yup.string().required(),
            line: Yup.string().required(),
            bank: Yup.string().required(),
            members: Yup.array(
                Yup.object().shape({
                    user: Yup.string().required(),
                }),
            ).required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensing = licensingsRepository.create(data);

        await licensingsRepository.save(licensing);

        await LogsLicensingsController.create(user_id, request, "create", licensing.id);

        return response.status(201).json(licensingView.render(licensing));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            value,
            deal,
            paid,
            paid_date,
            contract,
            notes,
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
            bank,
            type,
            line,
        } = request.body;

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            value,
            deal,
            paid,
            paid_date,
            contract,
            notes,
            updated_by: user.name,
            updated_at: new Date(),
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
            bank,
            type,
            line,
        };

        const schema = Yup.object().shape({
            licensing_number: Yup.string().notRequired().nullable(),
            expire: Yup.string().notRequired().nullable(),
            renovation: Yup.string().notRequired().nullable(),
            deadline: Yup.string().notRequired().nullable(),
            process_number: Yup.string().notRequired().nullable(),
            updated_at: Yup.date().required(),
            customer: Yup.string().required(),
            property: Yup.string().notRequired().nullable(),
            infringement: Yup.string().notRequired().nullable(),
            authorization: Yup.string().required(),
            agency: Yup.string().required(),
            status: Yup.string().required(),
            type: Yup.string().required(),
            line: Yup.string().required(),
            bank: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensing = licensingsRepository.create(data);

        await licensingsRepository.update(id, licensing);

        await LogsLicensingsController.create(user_id, request, "update", id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const licensing = await licensingsRepository.findOneOrFail(id,
            {
                relations: ['customer']
            }
        );

        await licensingsRepository.delete(id);

        await LogsUsersController.create("licensings", "remove", request, user_id, licensing.customer.name);

        return response.status(204).send();
    }
}