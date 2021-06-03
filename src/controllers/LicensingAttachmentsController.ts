import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

import licensingAttachmentView from '../views/licensingAttachmentView';
import { LicensingAttachmentsRepository } from '../repositories/LicensingAttachmentsRepository';
import LogsLicensingAttachmentsController from '../controllers/LogsLicensingAttachmentsController';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const licensingAttachments = await licensingAttachmentsRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(licensingAttachmentView.renderMany(licensingAttachments));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const licensingAttachment = await licensingAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'licensing',
            ]
        });

        const download = licensingAttachmentView.renderDownload(licensingAttachment);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        await LogsLicensingAttachmentsController.create(new Date(), user.name, 'view', licensingAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            expire,
            expire_at,
            licensing,
            schedule,
            schedule_at,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        if (schedule)
            expire = Yup.boolean().cast(schedule);

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            licensing,
            schedule,
            schedule_at,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired(),
            expire_at: Yup.date().notRequired(),
            schedule: Yup.boolean().notRequired(),
            schedule_at: Yup.date().notRequired(),
            licensing: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingAttachment = licensingAttachmentsRepository.create(data);

        await licensingAttachmentsRepository.save(licensingAttachment);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        await LogsLicensingAttachmentsController.create(new Date(), user.name, 'create', licensingAttachment.id);

        return response.status(201).json(licensingAttachmentView.render(licensingAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        if (schedule)
            expire = Yup.boolean().cast(schedule);

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const data = {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired(),
            expire_at: Yup.date().notRequired(),
            schedule: Yup.boolean().notRequired(),
            schedule_at: Yup.date().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingAttachment = licensingAttachmentsRepository.create(data);

        await licensingAttachmentsRepository.update(id, licensingAttachment);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        await LogsLicensingAttachmentsController.create(new Date(), user.name, 'update', licensingAttachment.id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const licensingAttachment = await licensingAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'licensing',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/licensings/${licensingAttachment.licensing.id}/${licensingAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file licensing attachment: ", err);
        }

        await licensingAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}