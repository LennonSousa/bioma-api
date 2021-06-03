import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import eventLicensingView from '../views/eventLicensingView';
import { EventsLicensingRepository } from '../repositories/EventsLicensingRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        const eventsLicensing = await eventsLicensingRepository.find({
            where: { licensing: id },
            order: {
                created_at: "ASC"
            }
        });

        return response.json(eventLicensingView.renderMany(eventsLicensing));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        const eventLicensing = await eventsLicensingRepository.findOneOrFail(id, {
            relations: [
                'licensing',
            ]
        });

        return response.json(eventLicensingView.render(eventLicensing));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            done,
            finished_at,
            licensing,
        } = request.body;

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const data = {
            description,
            done,
            finished_at,
            licensing,
            created_by: user.name,
            updated_by: user.name,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            done: Yup.boolean().notRequired(),
            finished_at: Yup.date().notRequired(),
            licensing: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const eventLicensing = eventsLicensingRepository.create(data);

        await eventsLicensingRepository.save(eventLicensing);

        return response.status(201).json(eventLicensingView.render(eventLicensing));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            done,
            finished_at,
        } = request.body;

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

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

        const eventLicensing = eventsLicensingRepository.create(data);

        await eventsLicensingRepository.update(id, eventLicensing);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        await eventsLicensingRepository.delete(id);

        return response.status(204).send();
    }
}