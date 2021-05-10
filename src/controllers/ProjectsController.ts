import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectView from '../views/projectView';
import { ProjectsRepository } from '../repositories/ProjectsRepository';

export default {
    async index(request: Request, response: Response) {
        const projectsRepository = getCustomRepository(ProjectsRepository);

        const projects = await projectsRepository.find({
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'property',
                'type',
                'status',
                'line',
            ],
            order: {
                created_at: "ASC"
            }
        });

        return response.json(projectView.renderMany(projects));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const project = await projectsRepository.findOneOrFail(id, {
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'property',
                'type',
                'status',
                'line',
                'events',
            ]
        });

        return response.json(projectView.render(project));
    },

    async create(request: Request, response: Response) {
        const {
            value,
            deal,
            contract,
            notes,
            warnings,
            customer,
            bank,
            property,
            type,
            status,
            line,
        } = request.body;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const data = {
            value,
            deal,
            contract,
            notes,
            warnings,
            customer,
            bank,
            property,
            type,
            status,
            line,
            created_by: 'ex',
            updated_by: 'ex',
        };

        const schema = Yup.object().shape({
            value: Yup.number().required(),
            deal: Yup.number().required(),
            contract: Yup.string().notRequired(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            customer: Yup.string().required(),
            type: Yup.string().required(),
            line: Yup.string().required(),
            status: Yup.string().required(),
            bank: Yup.string().required(),
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const project = projectsRepository.create(data);

        await projectsRepository.save(project);

        return response.status(201).json(projectView.render(project));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            value,
            deal,
            contract,
            notes,
            warnings,
            customer,
            bank,
            property,
            type,
            status,
            line,
        } = request.body;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const data = {
            value,
            deal,
            contract,
            notes,
            warnings,
            created_by: 'ex',
            updated_by: 'ex',
            updated_at: new Date(),
            customer,
            bank,
            property,
            type,
            status,
            line,
        };

        const schema = Yup.object().shape({
            value: Yup.number().required(),
            deal: Yup.number().required(),
            contract: Yup.string().notRequired(),
            notes: Yup.string().notRequired(),
            warnings: Yup.boolean().notRequired(),
            customer: Yup.string().required(),
            type: Yup.string().required(),
            line: Yup.string().required(),
            status: Yup.string().required(),
            bank: Yup.string().required(),
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const project = projectsRepository.create(data);

        await projectsRepository.update(id, project);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const projectsRepository = getCustomRepository(ProjectsRepository);

        await projectsRepository.delete(id);

        return response.status(204).send();
    }
}