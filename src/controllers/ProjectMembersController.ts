import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectMemberView from '../views/projectMemberView';
import { ProjectMembersRepository } from '../repositories/ProjectMembersRepository';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;
        const { limit = 6, page = 1 } = request.query;

        const projectMembersRepository = getCustomRepository(ProjectMembersRepository);

        const projectMembers = await projectMembersRepository.find(
            {
                where: { user: id },
                relations: [
                    'project',
                    'project.customer',
                    'project.bank',
                    'project.bank.institution',
                    'project.property',
                    'project.type',
                    'project.status',
                    'project.line',
                    'user',
                ],
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            }
        );

        const totalMembers = await projectMembersRepository.count(
            {
                where: { user: id },
            }
        );

        const totalPages = Math.ceil(totalMembers / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(projectMemberView.renderMany(projectMembers));
    },

    async create(request: Request, response: Response) {
        const {
            project,
            user,
        } = request.body;

        const projectMembersRepository = getCustomRepository(ProjectMembersRepository);

        const data = {
            project,
            user,
        };

        const schema = Yup.object().shape({
            project: Yup.string().required(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectMember = projectMembersRepository.create(data);

        await projectMembersRepository.save(projectMember);

        return response.status(201).json(projectMemberView.render(projectMember));
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const projectMembersRepository = getCustomRepository(ProjectMembersRepository);

        await projectMembersRepository.delete(id);

        return response.status(204).send();
    }
}