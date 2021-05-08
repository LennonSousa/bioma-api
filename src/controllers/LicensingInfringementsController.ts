import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import linfringementAgencyView from '../views/licensingInfringementView';
import { LicensingInfringementsRepository } from '../repositories/LicensingInfringementsRepository';

export default {
    async index(request: Request, response: Response) {
        const licensingInfringementsRepository = getCustomRepository(LicensingInfringementsRepository);

        const licensingInfringements = await licensingInfringementsRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(linfringementAgencyView.renderMany(licensingInfringements));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingInfringementsRepository = getCustomRepository(LicensingInfringementsRepository);

        const licensingInfringement = await licensingInfringementsRepository.findOneOrFail(id, {
            relations: [
                'licensings',
            ]
        });

        return response.json(linfringementAgencyView.render(licensingInfringement));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const licensingInfringementsRepository = getCustomRepository(LicensingInfringementsRepository);

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

        const licensingInfringement = licensingInfringementsRepository.create(data);

        await licensingInfringementsRepository.save(licensingInfringement);

        return response.status(201).json(linfringementAgencyView.render(licensingInfringement));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const licensingInfringementsRepository = getCustomRepository(LicensingInfringementsRepository);

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

        const licensingInfringement = licensingInfringementsRepository.create(data);

        await licensingInfringementsRepository.update(id, licensingInfringement);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingInfringementsRepository = getCustomRepository(LicensingInfringementsRepository);

        await licensingInfringementsRepository.delete(id);

        return response.status(204).send();
    }
}