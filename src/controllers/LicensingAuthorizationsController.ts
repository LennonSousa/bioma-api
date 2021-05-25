import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingAuthorizationView from '../views/licensingAuthorizationView';
import { LicensingAuthorizationsRepository } from '../repositories/LicensingAuthorizationsRepository';

export default {
    async index(request: Request, response: Response) {
        const licensingAuthorizationsRepository = getCustomRepository(LicensingAuthorizationsRepository);

        const licensingAuthorizations = await licensingAuthorizationsRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(licensingAuthorizationView.renderMany(licensingAuthorizations));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAuthorizationsRepository = getCustomRepository(LicensingAuthorizationsRepository);

        const licensingAuthorization = await licensingAuthorizationsRepository.findOneOrFail(id, {
            relations: [
                'licensings',
            ]
        });

        return response.json(licensingAuthorizationView.render(licensingAuthorization));
    },

    async create(request: Request, response: Response) {
        const {
            department,
            activity,
            sub_activity,
            order,
        } = request.body;

        const licensingAuthorizationsRepository = getCustomRepository(LicensingAuthorizationsRepository);

        const data = {
            department,
            activity,
            sub_activity,
            order,
        };

        const schema = Yup.object().shape({
            department: Yup.string().required(),
            activity: Yup.string().notRequired().nullable(),
            sub_activity: Yup.string().notRequired().nullable(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingAuthorization = licensingAuthorizationsRepository.create(data);

        await licensingAuthorizationsRepository.save(licensingAuthorization);

        return response.status(201).json(licensingAuthorizationView.render(licensingAuthorization));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            department,
            activity,
            sub_activity,
            order,
        } = request.body;

        const licensingAuthorizationsRepository = getCustomRepository(LicensingAuthorizationsRepository);

        const data = {
            department,
            activity,
            sub_activity,
            order,
        };

        const schema = Yup.object().shape({
            department: Yup.string().required(),
            activity: Yup.string().notRequired().nullable(),
            sub_activity: Yup.string().notRequired().nullable(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingAuthorization = licensingAuthorizationsRepository.create(data);

        await licensingAuthorizationsRepository.update(id, licensingAuthorization);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAuthorizationsRepository = getCustomRepository(LicensingAuthorizationsRepository);

        await licensingAuthorizationsRepository.delete(id);

        return response.status(204).send();
    }
}