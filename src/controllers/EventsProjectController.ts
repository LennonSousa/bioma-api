import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import eventProjectView from '../views/eventProjectView';
import { EventsProjectRepository } from '../repositories/EventsProjectRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const eventsProject = await eventsProjectRepository.find({
            where: { project: id },
            order: {
                created_at: "ASC"
            }
        });

        return response.json(eventProjectView.renderMany(eventsProject));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const eventProject = await eventsProjectRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        return response.json(eventProjectView.render(eventProject));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            done,
            finished_at,
            project,
        } = request.body;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            description,
            done,
            finished_at,
            project,
            created_by: user.name,
            updated_by: user.name,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            done: Yup.boolean().notRequired(),
            finished_at: Yup.date().notRequired(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const eventProject = eventsProjectRepository.create(data);

        await eventsProjectRepository.save(eventProject);

        return response.status(201).json(eventProjectView.render(eventProject));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            done,
            finished_at,
        } = request.body;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            description,
            done,
            updated_at: new Date(),
            finished_at,
            updated_by: user.name,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            done: Yup.boolean().notRequired(),
            updated_at: Yup.date().notRequired(),
            finished_at: Yup.date().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const eventProject = eventsProjectRepository.create(data);

        await eventsProjectRepository.update(id, eventProject);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        await eventsProjectRepository.delete(id);

        return response.status(204).send();
    }
}