import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

import customerAttachmentView from '../views/customerAttachmentView';
import { CustomerAttachmentsRepository } from '../repositories/CustomerAttachmentsRepository';
import LogsCustomerAttachmentsController from '../controllers/LogsCustomerAttachmentsController';

export default {
    async index(request: Request, response: Response) {
        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const customerAttachments = await customerAttachmentsRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(customerAttachmentView.renderMany(customerAttachments));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const customerAttachment = await customerAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'customer',
            ]
        });

        const download = customerAttachmentView.renderDownload(customerAttachment);

        await LogsCustomerAttachmentsController.create(new Date(), 'ex', 'view', customerAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        let {
            name,
            received_at,
            expire,
            expire_at,
            customer,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            customer,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired().nullable(),
            expire_at: Yup.date().required(),
            customer: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerAttachment = customerAttachmentsRepository.create(data);

        await customerAttachmentsRepository.save(customerAttachment);

        await LogsCustomerAttachmentsController.create(new Date(), 'ex', 'create', customerAttachment.id);

        return response.status(201).json(customerAttachmentView.render(customerAttachment));
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

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

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

        const customerAttachment = customerAttachmentsRepository.create(data);

        await customerAttachmentsRepository.update(id, customerAttachment);

        await LogsCustomerAttachmentsController.create(new Date(), 'ex', 'update', customerAttachment.id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        await customerAttachmentsRepository.delete(id);

        const customerAttachment = await customerAttachmentsRepository.findOneOrFail(id);

        try {
            fs.rmSync(`${process.env.CUSTOMERS_DIR}${customerAttachment.path}`, { maxRetries: 3 });
        }
        catch (err) {
            console.error("> Error to remove file customer attachment: ", err);
        }

        return response.status(204).send();
    }
}