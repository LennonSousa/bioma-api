import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectDocView from '../views/projectDocView';
import { ProjectDocsRepository } from '../repositories/ProjectDocsRepository';

export default {
    async index(request: Request, response: Response) {
        const docsProjectRepository = getCustomRepository(ProjectDocsRepository);

        const docsProject = await docsProjectRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(projectDocView.renderMany(docsProject));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const docsProjectRepository = getCustomRepository(ProjectDocsRepository);

        const docProject = await docsProjectRepository.findOneOrFail(id, {
            relations: [
                'project',
                'doc',
            ]
        });

        return response.json(projectDocView.render(docProject));
    },

    async create(request: Request, response: Response) {
        const {
            path,
            received_at,
            checked,
            project,
            doc,
        } = request.body;

        const docsProjectRepository = getCustomRepository(ProjectDocsRepository);

        const data = {
            path,
            received_at,
            checked,
            project,
            doc,
        };

        const schema = Yup.object().shape({
            path: Yup.string().notRequired().nullable(),
            received_at: Yup.date().notRequired(),
            checked: Yup.boolean().notRequired(),
            project: Yup.string().required(),
            doc: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const docProject = docsProjectRepository.create(data);

        await docsProjectRepository.save(docProject);

        return response.status(201).json(projectDocView.render(docProject));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            path,
            received_at,
            checked,
            project,
        } = request.body;

        const docsProjectRepository = getCustomRepository(ProjectDocsRepository);

        const data = {
            path,
            received_at,
            checked,
            project,
        };

        const schema = Yup.object().shape({
            path: Yup.string().notRequired().nullable(),
            received_at: Yup.date().notRequired(),
            checked: Yup.boolean().notRequired(),
            project: Yup.string().required(),
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

        const docsProjectRepository = getCustomRepository(ProjectDocsRepository);

        await docsProjectRepository.delete(id);

        return response.status(204).send();
    }
}