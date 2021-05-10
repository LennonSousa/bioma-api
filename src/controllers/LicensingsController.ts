import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingView from '../views/licensingView';
import { LicensingsRepository } from '../repositories/LicensingsRepository';

export default {
    async index(request: Request, response: Response) {
        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const licensings = await licensingsRepository.find({
            order: {
                created_at: "ASC"
            }
        });

        return response.json(licensingView.renderMany(licensings));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const licensing = await licensingsRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'property',
                'infringement',
                'authorization',
                'agency',
                'status',
                'events',
            ]
        });

        return response.json(licensingView.render(licensing));
    },

    async create(request: Request, response: Response) {
        const {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
        } = request.body;

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const data = {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
            created_by: 'ex',
            updated_by: 'ex',
        };

        const schema = Yup.object().shape({
            licensing_number: Yup.string().notRequired(),
            expire: Yup.string().notRequired(),
            renovation: Yup.string().notRequired(),
            deadline: Yup.string().notRequired(),
            process_number: Yup.string().notRequired(),
            customer: Yup.string().required(),
            property: Yup.string().notRequired(),
            infringement: Yup.string().notRequired(),
            authorization: Yup.string().required(),
            agency: Yup.string().required(),
            status: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensing = licensingsRepository.create(data);

        await licensingsRepository.save(licensing);

        return response.status(201).json(licensingView.render(licensing));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
        } = request.body;

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const data = {
            licensing_number,
            expire,
            renovation,
            deadline,
            process_number,
            updated_by: 'ex',
            updated_at: new Date(),
            customer,
            property,
            infringement,
            authorization,
            agency,
            status,
        };

        const schema = Yup.object().shape({
            licensing_number: Yup.string().notRequired(),
            expire: Yup.string().notRequired(),
            renovation: Yup.string().notRequired(),
            deadline: Yup.string().notRequired(),
            process_number: Yup.string().notRequired(),
            updated_at: Yup.date().required(),
            customer: Yup.string().required(),
            property: Yup.string().notRequired(),
            infringement: Yup.string().notRequired(),
            authorization: Yup.string().required(),
            agency: Yup.string().required(),
            status: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensing = licensingsRepository.create(data);

        await licensingsRepository.update(id, licensing);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        await licensingsRepository.delete(id);

        return response.status(204).send();
    }
}