import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import eventProjectView from '../views/eventProjectView';
import { EventsProjectRepository } from '../repositories/EventsProjectRepository';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;

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
        const { id } = request.params;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const eventProject = await eventsProjectRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        return response.json(eventProjectView.render(eventProject));
    },

    async create(request: Request, response: Response) {
        const {
            description,
            done,
            finished_at,
            project,
        } = request.body;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const data = {
            description,
            done,
            finished_at,
            project,
            created_by: 'ex',
            updated_by: 'ex',
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            done: Yup.boolean().required(),
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
        const { id } = request.params;

        const {
            description,
            done,
            finished_at,
        } = request.body;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const data = {
            description,
            done,
            updated_at: new Date(),
            finished_at,
            created_by: 'ex',
            updated_by: 'ex',
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            done: Yup.boolean().required(),
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
        const { id } = request.params;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        await eventsProjectRepository.delete(id);

        return response.status(204).send();
    }
}