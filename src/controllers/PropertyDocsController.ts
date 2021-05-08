import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import propertyDocView from '../views/propertyDocView';
import { PropertyDocsRepository } from '../repositories/PropertyDocsRepository';

export default {
    async index(request: Request, response: Response) {
        const docsPropertyRepository = getCustomRepository(PropertyDocsRepository);

        const docsProperty = await docsPropertyRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(propertyDocView.renderMany(docsProperty));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const docsPropertyRepository = getCustomRepository(PropertyDocsRepository);

        const docProperty = await docsPropertyRepository.findOneOrFail(id, {
            relations: [
                'property',
                'doc',
            ]
        });

        return response.json(propertyDocView.render(docProperty));
    },

    async create(request: Request, response: Response) {
        const {
            path,
            received_at,
            checked,
            property,
            doc,
        } = request.body;

        const docsPropertyRepository = getCustomRepository(PropertyDocsRepository);

        const data = {
            path,
            received_at,
            checked,
            property,
            doc,
        };

        const schema = Yup.object().shape({
            path: Yup.string().required(),
            received_at: Yup.date().notRequired(),
            checked: Yup.boolean().notRequired(),
            property: Yup.string().required(),
            doc: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docProperty = docsPropertyRepository.create(data);

        await docsPropertyRepository.save(docProperty);

        return response.status(201).json(propertyDocView.render(docProperty));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            path,
            received_at,
            checked,
            property,
        } = request.body;

        const docsPropertyRepository = getCustomRepository(PropertyDocsRepository);

        const data = {
            path,
            received_at,
            checked,
            property,
        };

        const schema = Yup.object().shape({
            path: Yup.string().required(),
            received_at: Yup.date().notRequired(),
            checked: Yup.boolean().notRequired(),
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docProperty = docsPropertyRepository.create(data);

        await docsPropertyRepository.update(id, docProperty);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const docsPropertyRepository = getCustomRepository(PropertyDocsRepository);

        await docsPropertyRepository.delete(id);

        return response.status(204).send();
    }
}