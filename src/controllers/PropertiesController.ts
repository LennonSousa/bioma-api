import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import propertyView from '../views/propertyView';
import { PropertiesRepository } from '../repositories/PropertiesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import LogsPropertiesController from '../controllers/LogsPropertiesController';
import LogsUsersController from '../controllers/LogsUsersController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { limit = 10, page = 1, customer } = request.query;

        if (! await UsersRolesController.can(user_id, "properties", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        var findConditions = {};

        if (customer) findConditions['customer'] = customer;

        const properties = await propertiesRepository.find({
            where: findConditions,
            relations: [
                'customer',
            ],
            order: {
                created_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalItems = await propertiesRepository.count({
            where: findConditions,
        });

        const totalPages = Math.ceil(totalItems / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(propertyView.renderMany(properties));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const property = await propertiesRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'customer.properties',
                'docs',
                'docs.doc',
                'attachments',
                'attachments.property',
                'attachments.logs',
                'attachments.shares',
                'members',
                'members.user',
                'logs',
            ]
        });

        return response.json(propertyView.render(property));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            registration,
            route,
            city,
            state,
            area,
            coordinates,
            notes,
            warnings,
            warnings_text,
            customer,
            docs,
            members,
        } = request.body;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            name,
            registration,
            route,
            city,
            state,
            area,
            coordinates,
            notes,
            warnings,
            warnings_text,
            created_by: user.name,
            customer,
            docs,
            members,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            registration: Yup.string().notRequired(),
            route: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            area: Yup.string().required(),
            coordinates: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            warnings_text: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
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

        const property = propertiesRepository.create(data);

        await propertiesRepository.save(property);

        await LogsPropertiesController.create(user_id, request, "create", property.id);

        return response.status(201).json(propertyView.render(property));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            registration,
            route,
            city,
            state,
            area,
            coordinates,
            notes,
            warnings,
            warnings_text,
            customer,
        } = request.body;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const data = {
            name,
            registration,
            route,
            city,
            state,
            area,
            coordinates,
            notes,
            warnings,
            warnings_text,
            customer,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            registration: Yup.string().notRequired(),
            route: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            area: Yup.string().required(),
            coordinates: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired().nullable(),
            warnings: Yup.boolean().notRequired(),
            warnings_text: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const property = propertiesRepository.create(data);

        await propertiesRepository.update(id, property);

        await LogsPropertiesController.create(user_id, request, "update", id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const property = await propertiesRepository.findOneOrFail(id,
            {
                relations: ['customer']
            }
        );

        await propertiesRepository.delete(id);

        await LogsUsersController.create("properties", "remove", request, user_id, `${property.name} - ${property.customer.name}`);

        return response.status(204).send();
    }
}