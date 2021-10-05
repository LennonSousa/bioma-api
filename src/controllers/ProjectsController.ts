import { Request, Response } from 'express';
import { Between, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

import projectView from '../views/projectView';
import { ProjectsRepository } from '../repositories/ProjectsRepository';
import LogsProjectsController from '../controllers/LogsProjectsController';
import LogsUsersController from '../controllers/LogsUsersController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, customer, property, bank } = request.query;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        if (start && end) {
            const projects = await projectsRepository.find({
                where: { updated_at: Between(start, end) },
                relations: [
                    'customer',
                    'bank',
                    'bank.institution',
                    'property',
                    'type',
                    'status',
                    'line',
                ],
                order: {
                    updated_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalItems = await projectsRepository.count({
                where: { updated_at: Between(start, end) },
            });

            const totalPages = Math.ceil(totalItems / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(projectView.renderMany(projects));
        }

        var findConditions = {};

        if (customer) findConditions['customer'] = customer;
        if (property) findConditions['property'] = property;
        if (bank) findConditions['bank'] = bank;

        const projects = await projectsRepository.find({
            where: findConditions,
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'property',
                'type',
                'status',
                'line',
            ],
            order: {
                updated_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalItems = await projectsRepository.count({
            where: findConditions,
        });

        const totalPages = Math.ceil(totalItems / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(projectView.renderMany(projects));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const project = await projectsRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'property',
                'type',
                'status',
                'line',
                'docs',
                'docs.doc',
                'events',
                'attachments',
                'attachments.project',
                'attachments.logs',
                'attachments.shares',
                'members',
                'members.user',
                'logs',
            ]
        });

        return response.json(projectView.render(project));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            value,
            deal,
            paid,
            paid_date,
            contract,
            analyst,
            analyst_contact,
            notes,
            warnings,
            warnings_text,
            customer,
            bank,
            property,
            type,
            status,
            line,
            members,
        } = request.body;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            value,
            deal,
            paid,
            paid_date,
            contract,
            analyst,
            analyst_contact,
            notes,
            warnings,
            warnings_text,
            customer,
            bank,
            property,
            type,
            status,
            line,
            members,
            created_by: user.name,
            updated_by: user.name,
        };

        const schema = Yup.object().shape({
            value: Yup.number().notRequired(),
            deal: Yup.number().notRequired(),
            paid: Yup.boolean().notRequired(),
            paid_date: Yup.string().notRequired().nullable(),
            contract: Yup.string().notRequired().nullable(),
            analyst: Yup.string().notRequired().nullable(),
            analyst_contact: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            warnings_text: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
            type: Yup.string().required(),
            line: Yup.string().required(),
            status: Yup.string().required(),
            bank: Yup.string().required(),
            property: Yup.string().required(),
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

        const project = projectsRepository.create(data);

        await projectsRepository.save(project);

        await LogsProjectsController.create(user_id, request, "create", project.id);

        return response.status(201).json(projectView.render(project));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            value,
            deal,
            paid,
            paid_date,
            contract,
            analyst,
            analyst_contact,
            notes,
            warnings,
            warnings_text,
            customer,
            bank,
            property,
            type,
            status,
            line,
        } = request.body;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            value,
            deal,
            paid,
            paid_date,
            contract,
            analyst,
            analyst_contact,
            notes,
            warnings,
            warnings_text,
            updated_by: user.name,
            updated_at: new Date(),
            customer,
            bank,
            property,
            type,
            status,
            line,
        };

        const schema = Yup.object().shape({
            value: Yup.number().notRequired(),
            deal: Yup.number().notRequired(),
            paid: Yup.boolean().notRequired(),
            paid_date: Yup.string().notRequired().nullable(),
            contract: Yup.string().notRequired(),
            analyst: Yup.string().notRequired().nullable(),
            analyst_contact: Yup.string().notRequired().nullable(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            warnings_text: Yup.string().notRequired().nullable(),
            customer: Yup.string().required(),
            type: Yup.string().required(),
            line: Yup.string().required(),
            status: Yup.string().required(),
            bank: Yup.string().required(),
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const project = projectsRepository.create(data);

        await projectsRepository.update(id, project);

        await LogsProjectsController.create(user_id, request, "update", id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const project = await projectsRepository.findOneOrFail(id,
            {
                relations: ['customer']
            }
        );

        await projectsRepository.delete(id);

        await LogsUsersController.create("projects", "remove", request, user_id, project.customer.name);

        return response.status(204).send();
    }
}