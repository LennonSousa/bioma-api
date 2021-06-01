import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import eventLicensingView from '../views/eventLicensingView';
import { EventsLicensingRepository } from '../repositories/EventsLicensingRepository';

export default {
    async index(request: Request, response: Response) {
        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        const eventsLicensing = await eventsLicensingRepository.find({
            order: {
                created_at: "ASC"
            }
        });

        return response.json(eventLicensingView.renderMany(eventsLicensing));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        const eventLicensing = await eventsLicensingRepository.findOneOrFail(id, {
            relations: [
                'licensing',
            ]
        });

        return response.json(eventLicensingView.render(eventLicensing));
    },

    async create(request: Request, response: Response) {
        const {
            description,
            done,
            finished_at,
            licensing,
        } = request.body;

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        const data = {
            description,
            done,
            finished_at,
            licensing,
            created_by: 'ex',
            updated_by: 'ex',
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
        const { id } = request.params;

        const {
            description,
            done,
            finished_at,
        } = request.body;

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

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
        const { id } = request.params;

        const eventsLicensingRepository = getCustomRepository(EventsLicensingRepository);

        await eventsLicensingRepository.delete(id);

        return response.status(204).send();
    }
}