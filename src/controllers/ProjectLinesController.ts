import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectLineView from '../views/projectLineView';
import { ProjectLinesRepository } from '../repositories/ProjectLinesRepository';

export default {
    async index(request: Request, response: Response) {
        const projectLinesRepository = getCustomRepository(ProjectLinesRepository);

        const projectLines = await projectLinesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(projectLineView.renderMany(projectLines));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const projectLinesRepository = getCustomRepository(ProjectLinesRepository);

        const projectLine = await projectLinesRepository.findOneOrFail(id, {
            relations: [
                'projects',
            ]
        });

        return response.json(projectLineView.render(projectLine));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            order,
        } = request.body;

        const projectLinesRepository = getCustomRepository(ProjectLinesRepository);

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

        const projectLine = projectLinesRepository.create(data);

        await projectLinesRepository.save(projectLine);

        return response.status(201).json(projectLineView.render(projectLine));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            order,
        } = request.body;

        const projectLinesRepository = getCustomRepository(ProjectLinesRepository);

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

        const projectLine = projectLinesRepository.create(data);

        await projectLinesRepository.update(id, projectLine);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const projectLinesRepository = getCustomRepository(ProjectLinesRepository);

        await projectLinesRepository.delete(id);

        return response.status(204).send();
    }
}