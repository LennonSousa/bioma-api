import { Request, Response } from 'express';
import { getCustomRepository, Equal } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';
import { format } from 'date-fns';

import customerAttachmentView from '../views/customerAttachmentView';
import { CustomerAttachmentsRepository } from '../repositories/CustomerAttachmentsRepository';
import LogsCustomerAttachmentsController from '../controllers/LogsCustomerAttachmentsController';
import UsersRolesController from './UsersRolesController';
import LogsCustomersController from '../controllers/LogsCustomersController';

export default {
    async index() {
        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const now = format(new Date(), 'yyyy-MM-dd');

        const customerAttachments = await customerAttachmentsRepository.find({
            where: {
                expire: true,
                schedule: true,
                schedule_at: Equal(now),
            },
            order: {
                received_at: "ASC"
            },
            relations: [
                'customer',
                'customer.members',
                'customer.members.user',
            ]
        });

        return customerAttachments;
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const customerAttachment = await customerAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'customer',
            ]
        });

        const download = customerAttachmentView.renderDownload(customerAttachment);

        await LogsCustomerAttachmentsController.create(user_id, 'view', request, customerAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            expire,
            expire_at,
            schedule,
            schedule_at,
            order,
            customer,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        if (schedule)
            schedule = Yup.boolean().cast(schedule);

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

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
            customer,
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
            customer: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerAttachment = customerAttachmentsRepository.create(data);

        await customerAttachmentsRepository.save(customerAttachment);

        await LogsCustomerAttachmentsController.create(user_id, 'create', request, customerAttachment.id);

        return response.status(201).json(customerAttachmentView.render(customerAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "update"))
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

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

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

        const customerAttachment = customerAttachmentsRepository.create(data);

        await customerAttachmentsRepository.update(id, customerAttachment);

        await LogsCustomerAttachmentsController.create(user_id, 'update', request, id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const customerAttachment = await customerAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'customer',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/customers/${customerAttachment.customer.id}/${customerAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file customer attachment: ", err);
        }

        await customerAttachmentsRepository.delete(id);

        await LogsCustomersController.create(
            user_id,
            request,
            "remove",
            customerAttachment.customer.id,
            customerAttachment.name,
        );

        return response.status(204).send();
    }
}