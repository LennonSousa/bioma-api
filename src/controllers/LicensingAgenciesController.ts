import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingAgencyView from '../views/licensingAgencyView';
import { LicensingAgenciesRepository } from '../repositories/LicensingAgenciesRepository';

export default {
    async index(request: Request, response: Response) {
        const licensingAgenciesRepository = getCustomRepository(LicensingAgenciesRepository);

        const licensingAgencies = await licensingAgenciesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(licensingAgencyView.renderMany(licensingAgencies));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAgenciesRepository = getCustomRepository(LicensingAgenciesRepository);

        const licensingAgency = await licensingAgenciesRepository.findOneOrFail(id, {
            relations: [
                'licensings',
            ]
        });

        return response.json(licensingAgencyView.render(licensingAgency));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const licensingAgenciesRepository = getCustomRepository(LicensingAgenciesRepository);

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

        const licensingStatus = licensingAgenciesRepository.create(data);

        await licensingAgenciesRepository.save(licensingStatus);

        return response.status(201).json(licensingAgencyView.render(licensingStatus));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const licensingAgenciesRepository = getCustomRepository(LicensingAgenciesRepository);

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

        const licensingAgency = licensingAgenciesRepository.create(data);

        await licensingAgenciesRepository.update(id, licensingAgency);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAgenciesRepository = getCustomRepository(LicensingAgenciesRepository);

        await licensingAgenciesRepository.delete(id);

        return response.status(204).send();
    }
}