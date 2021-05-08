import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingStatusView from '../views/licensingStatusView';
import { LicensingStatusRepository } from '../repositories/LicensingStatusRepository';

export default {
    async index(request: Request, response: Response) {
        const licensingStatusRepository = getCustomRepository(LicensingStatusRepository);

        const licensingStatus = await licensingStatusRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(licensingStatusView.renderMany(licensingStatus));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingStatusRepository = getCustomRepository(LicensingStatusRepository);

        const licensingStatus = await licensingStatusRepository.findOneOrFail(id, {
            relations: [
                'licensings',
            ]
        });

        return response.json(licensingStatusView.render(licensingStatus));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const licensingStatusRepository = getCustomRepository(LicensingStatusRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingStatus = licensingStatusRepository.create(data);

        await licensingStatusRepository.save(licensingStatus);

        return response.status(201).json(licensingStatusView.render(licensingStatus));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const licensingStatusRepository = getCustomRepository(LicensingStatusRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingStatus = licensingStatusRepository.create(data);

        await licensingStatusRepository.update(id, licensingStatus);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingStatusRepository = getCustomRepository(LicensingStatusRepository);

        await licensingStatusRepository.delete(id);

        return response.status(204).send();
    }
}