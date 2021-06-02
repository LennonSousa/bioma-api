import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectMemberView from '../views/projectMemberView';
import { ProjectMembersRepository } from '../repositories/ProjectMembersRepository';

export default {
    async index(request: Request, response: Response) {
        const projectMembersRepository = getCustomRepository(ProjectMembersRepository);

        const projectMembers = await projectMembersRepository.find();

        return response.json(projectMemberView.renderMany(projectMembers));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const projectMembersRepository = getCustomRepository(ProjectMembersRepository);

        const projectMember = await projectMembersRepository.findOneOrFail(id, {
            relations: [
                'project',
                'user',
            ]
        });

        return response.json(projectMemberView.render(projectMember));
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