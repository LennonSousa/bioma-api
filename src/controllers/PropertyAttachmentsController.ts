import { Request, Response } from 'express';
import { Equal, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';
import { format } from 'date-fns';

import propertyAttachmentView from '../views/propertyAttachmentView';
import { PropertyAttachmentsRepository } from '../repositories/PropertyAttachmentsRepository';
import LogsPropertyAttachmentsController from '../controllers/LogsPropertyAttachmentsController';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index() {
        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const now = format(new Date(), 'yyyy-MM-dd');

        const propertyAttachments = await propertyAttachmentsRepository.find({
            where: {
                expire: true,
                schedule: true,
                schedule_at: Equal(now),
            },
            order: {
                received_at: "ASC"
            },
            relations: [
                'property',
                'property.members',
                'property.members.user',
            ]
        });

        return propertyAttachments;
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const propertyAttachment = await propertyAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'property',
            ]
        });

        const download = propertyAttachmentView.renderDownload(propertyAttachment);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        await LogsPropertyAttachmentsController.create(new Date(), user.name, 'view', propertyAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
            order,
            property,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        if (schedule)
            schedule = Yup.boolean().cast(schedule);

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

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
            property,
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
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const propertyAttachment = propertyAttachmentsRepository.create(data);

        await propertyAttachmentsRepository.save(propertyAttachment);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        await LogsPropertyAttachmentsController.create(new Date(), user.name, 'create', propertyAttachment.id);

        return response.status(201).json(propertyAttachmentView.render(propertyAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "update"))
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

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

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

        const propertyAttachment = propertyAttachmentsRepository.create(data);

        await propertyAttachmentsRepository.update(id, propertyAttachment);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        await LogsPropertyAttachmentsController.create(new Date(), user.name, 'update', id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const propertyAttachment = await propertyAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'property',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/properties/${propertyAttachment.property.id}/${propertyAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file property attachment: ", err);
        }

        await propertyAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}