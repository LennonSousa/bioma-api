import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import institutionView from '../views/institutionView';
import { InstitutionsRepository } from '../repositories/InstitutionsRepository';

export default {
    async index(request: Request, response: Response) {
        const institutionsRepository = getCustomRepository(InstitutionsRepository);

        const institutions = await institutionsRepository.find();

        return response.json(institutionView.renderMany(institutions));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const institutionsRepository = getCustomRepository(InstitutionsRepository);

        const institution = await institutionsRepository.findOneOrFail(id, {
            relations: [
                'banks',
            ]
        });

        return response.json(institutionView.render(institution));
    },

    async create(request: Request, response: Response) {
        const {
            name,
        } = request.body;

        const institutionsRepository = getCustomRepository(InstitutionsRepository);

        const data = {
            name,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const institution = institutionsRepository.create(data);

        await institutionsRepository.save(institution);

        return response.status(201).json(institutionView.render(institution));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
        } = request.body;

        const institutionsRepository = getCustomRepository(InstitutionsRepository);

        const data = {
            name,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const institution = institutionsRepository.create(data);

        await institutionsRepository.update(id, institution);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const institutionsRepository = getCustomRepository(InstitutionsRepository);

        await institutionsRepository.delete(id);

        return response.status(204).send();
    }
}