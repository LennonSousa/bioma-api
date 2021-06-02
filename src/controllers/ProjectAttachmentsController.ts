import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectAttachmentView from '../views/projectAttachmentView';
import { ProjectAttachmentsRepository } from '../repositories/ProjectAttachmentsRepository';
import LogsProjectAttachmentsController from '../controllers/LogsProjectAttachmentsController';

export default {
    async index(request: Request, response: Response) {
        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const projectAttachments = await projectAttachmentsRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(projectAttachmentView.renderMany(projectAttachments));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const projectAttachment = await projectAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        const download = projectAttachmentView.renderDownload(projectAttachment);

        await LogsProjectAttachmentsController.create(new Date(), 'ex', 'view', projectAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        let {
            name,
            received_at,
            expire,
            expire_at,
            project,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            project,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired().nullable(),
            expire_at: Yup.date().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachment = projectAttachmentsRepository.create(data);

        await projectAttachmentsRepository.save(projectAttachment);

        await LogsProjectAttachmentsController.create(new Date(), 'ex', 'create', projectAttachment.id);

        return response.status(201).json(projectAttachmentView.render(projectAttachment));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        let {
            name,
            received_at,
            expire,
            expire_at,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const data = {
            name,
            received_at,
            expire,
            expire_at,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired().nullable(),
            expire_at: Yup.date().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachment = projectAttachmentsRepository.create(data);

        await projectAttachmentsRepository.update(id, projectAttachment);

        await LogsProjectAttachmentsController.create(new Date(), 'ex', 'update', projectAttachment.id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        await projectAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}