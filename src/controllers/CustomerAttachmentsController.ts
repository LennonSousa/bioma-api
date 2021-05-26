import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import customerAttachmentView from '../views/customerAttachmentView';
import { CustomerAttachmentsRepository } from '../repositories/CustomerAttachmentsRepository';

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

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        let {
            name,
            received_at,
            expire,
            expire_at,
            renewal,
            customer,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        renewal = Number(renewal);

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            renewal,
            customer,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired(),
            expire_at: Yup.date().required(),
            renewal: Yup.number().notRequired(),
            customer: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerAttachment = customerAttachmentsRepository.create(data);

        await customerAttachmentsRepository.save(customerAttachment);

        return response.status(201).json(customerAttachmentView.render(customerAttachment));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        let {
            name,
            received_at,
            expire,
            expire_at,
            renewal,
            customer,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        renewal = Number(renewal);

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        const data = {
            name,
            received_at,
            expire,
            expire_at,
            renewal,
            customer,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired(),
            expire_at: Yup.date().required(),
            renewal: Yup.number().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerAttachment = customerAttachmentsRepository.create(data);

        await customerAttachmentsRepository.update(id, customerAttachment);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customerAttachmentsRepository = getCustomRepository(CustomerAttachmentsRepository);

        await customerAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}