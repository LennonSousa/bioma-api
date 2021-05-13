import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import docPropertyView from '../views/docPropertyView';
import { DocsPropertyRepository } from '../repositories/DocsPropertyRepository';

export default {
    async index(request: Request, response: Response) {
        const docsPropertyRepository = getCustomRepository(DocsPropertyRepository);

        const docsProperty = await docsPropertyRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(docPropertyView.renderMany(docsProperty));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const docsPropertyRepository = getCustomRepository(DocsPropertyRepository);

        const docProperty = await docsPropertyRepository.findOneOrFail(id, {
            relations: [
                'docs',
            ]
        });

        return response.json(docPropertyView.render(docProperty));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            active,
            order,
        } = request.body;

        const docsPropertyRepository = getCustomRepository(DocsPropertyRepository);

        const data = {
            name,
            active,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            active: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docProperty = docsPropertyRepository.create(data);

        await docsPropertyRepository.save(docProperty);

        return response.status(201).json(docPropertyView.render(docProperty));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            active,
            order,
        } = request.body;

        const docsPropertyRepository = getCustomRepository(DocsPropertyRepository);

        const data = {
            name,
            active,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            active: Yup.boolean().notRequired(),
            order: Yup.number().required(),
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

        const docsPropertyRepository = getCustomRepository(DocsPropertyRepository);

        await docsPropertyRepository.delete(id);

        return response.status(204).send();
    }
}