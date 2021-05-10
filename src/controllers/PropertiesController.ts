import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import propertyView from '../views/propertyView';
import { PropertiesRepository } from '../repositories/PropertiesRepository';

export default {
    async index(request: Request, response: Response) {
        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const properties = await propertiesRepository.find({
            relations: [
                'customer',
            ],
            order: {
                created_at: "ASC"
            }
        });

        return response.json(propertyView.renderMany(properties));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const property = await propertiesRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'docs',
                'projects',
            ]
        });

        return response.json(propertyView.render(property));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            registration,
            route,
            city,
            state,
            area,
            notes,
            warnings,
            customer,
        } = request.body;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const data = {
            name,
            registration,
            route,
            city,
            state,
            area,
            notes,
            warnings,
            created_by: 'ex',
            customer,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            registration: Yup.string().notRequired(),
            route: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            area: Yup.string().required(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            customer: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const property = propertiesRepository.create(data);

        await propertiesRepository.save(property);

        return response.status(201).json(propertyView.render(property));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            registration,
            route,
            city,
            state,
            area,
            notes,
            warnings,
        } = request.body;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const data = {
            name,
            registration,
            route,
            city,
            state,
            area,
            notes,
            warnings,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            registration: Yup.string().notRequired(),
            route: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            area: Yup.string().required(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const property = propertiesRepository.create(data);

        await propertiesRepository.update(id, property);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        await propertiesRepository.delete(id);

        return response.status(204).send();
    }
}