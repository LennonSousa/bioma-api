import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import docProjectView from '../views/docProjectView';
import { DocsProjectRepository } from '../repositories/DocsProjectRepository';

export default {
    async index(request: Request, response: Response) {
        const docsProjectRepository = getCustomRepository(DocsProjectRepository);

        const docsProject = await docsProjectRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(docProjectView.renderMany(docsProject));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const docsProjectRepository = getCustomRepository(DocsProjectRepository);

        const docProject = await docsProjectRepository.findOneOrFail(id, {
            relations: [
                'docs',
            ]
        });

        return response.json(docProjectView.render(docProject));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            active,
            order,
        } = request.body;

        const docsProjectRepository = getCustomRepository(DocsProjectRepository);

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

        const docProject = docsProjectRepository.create(data);

        await docsProjectRepository.save(docProject);

        return response.status(201).json(docProjectView.render(docProject));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            active,
            order,
        } = request.body;

        const docsProjectRepository = getCustomRepository(DocsProjectRepository);

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

        const docProject = docsProjectRepository.create(data);

        await docsProjectRepository.update(id, docProject);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const docsProjectRepository = getCustomRepository(DocsProjectRepository);

        await docsProjectRepository.delete(id);

        return response.status(204).send();
    }
}