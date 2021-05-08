import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectStatusView from '../views/projectStatusView';
import { ProjectStatusRepository } from '../repositories/ProjectStatusRepository';

export default {
    async index(request: Request, response: Response) {
        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        const projectStatus = await projectStatusRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(projectStatusView.renderMany(projectStatus));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        const projectStatus = await projectStatusRepository.findOneOrFail(id, {
            relations: [
                'projects',
            ]
        });

        return response.json(projectStatusView.render(projectStatus));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

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

        const projectStatus = projectStatusRepository.create(data);

        await projectStatusRepository.save(projectStatus);

        return response.status(201).json(projectStatusView.render(projectStatus));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

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

        const projectStatus = projectStatusRepository.create(data);

        await projectStatusRepository.update(id, projectStatus);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        await projectStatusRepository.delete(id);

        return response.status(204).send();
    }
}