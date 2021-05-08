import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectTypeView from '../views/projectTypeView';
import { ProjectTypesRepository } from '../repositories/ProjectTypesRepository';

export default {
    async index(request: Request, response: Response) {
        const projectTypesRepository = getCustomRepository(ProjectTypesRepository);

        const projectTypes = await projectTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(projectTypeView.renderMany(projectTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const projectTypesRepository = getCustomRepository(ProjectTypesRepository);

        const projectType = await projectTypesRepository.findOneOrFail(id, {
            relations: [
                'projects',
            ]
        });

        return response.json(projectTypeView.render(projectType));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const projectTypesRepository = getCustomRepository(ProjectTypesRepository);

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

        const projectType = projectTypesRepository.create(data);

        await projectTypesRepository.save(projectType);

        return response.status(201).json(projectTypeView.render(projectType));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const projectTypesRepository = getCustomRepository(ProjectTypesRepository);

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

        const projectType = projectTypesRepository.create(data);

        await projectTypesRepository.update(id, projectType);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const projectTypesRepository = getCustomRepository(ProjectTypesRepository);

        await projectTypesRepository.delete(id);

        return response.status(204).send();
    }
}