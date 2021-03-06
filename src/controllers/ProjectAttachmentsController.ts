import { Request, Response } from 'express';
import { Equal, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';
import { format } from 'date-fns';

import projectAttachmentView from '../views/projectAttachmentView';
import { ProjectAttachmentsRepository } from '../repositories/ProjectAttachmentsRepository';
import LogsProjectAttachmentsController from '../controllers/LogsProjectAttachmentsController';
import UsersRolesController from './UsersRolesController';
import LogsProjectsController from '../controllers/LogsProjectsController';

export default {
    async index() {
        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const now = format(new Date(), 'yyyy-MM-dd');

        const projectAttachments = await projectAttachmentsRepository.find({
            where: {
                expire: true,
                schedule: true,
                schedule_at: Equal(now),
            },
            order: {
                received_at: "ASC"
            },
            relations: [
                'project',
                'project.customer',
                'project.members',
                'project.members.user',
            ]
        });

        return projectAttachments;
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const projectAttachment = await projectAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        const download = projectAttachmentView.renderDownload(projectAttachment);

        await LogsProjectAttachmentsController.create(user_id, 'view', request, projectAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
            order,
            project,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        if (schedule)
            schedule = Yup.boolean().cast(schedule);

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
            order,
            project,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired(),
            expire_at: Yup.date().notRequired(),
            schedule: Yup.boolean().notRequired(),
            schedule_at: Yup.date().notRequired(),
            order: Yup.number().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachment = projectAttachmentsRepository.create(data);

        await projectAttachmentsRepository.save(projectAttachment);

        await LogsProjectAttachmentsController.create(user_id, 'create', request, projectAttachment.id);

        return response.status(201).json(projectAttachmentView.render(projectAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
            order,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        if (schedule)
            expire = Yup.boolean().cast(schedule);

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const data = {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired(),
            expire_at: Yup.date().notRequired(),
            schedule: Yup.boolean().notRequired(),
            schedule_at: Yup.date().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachment = projectAttachmentsRepository.create(data);

        await projectAttachmentsRepository.update(id, projectAttachment);

        await LogsProjectAttachmentsController.create(user_id, 'update', request, id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const projectAttachment = await projectAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/projects/${projectAttachment.project.id}/${projectAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file project attachment: ", err);
        }

        await projectAttachmentsRepository.delete(id);

        await LogsProjectsController.create(
            user_id,
            request,
            'remove',
            projectAttachment.project.id,
            projectAttachment.name,
        );

        return response.status(204).send();
    }
}