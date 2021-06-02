import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import propertyAttachmentView from '../views/propertyAttachmentView';
import { PropertyAttachmentsRepository } from '../repositories/PropertyAttachmentsRepository';
import LogsPropertyAttachmentsController from '../controllers/LogsPropertyAttachmentsController';

export default {
    async index(request: Request, response: Response) {
        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const propertyAttachments = await propertyAttachmentsRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(propertyAttachmentView.renderMany(propertyAttachments));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const propertyAttachment = await propertyAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'property',
            ]
        });

        const download = propertyAttachmentView.renderDownload(propertyAttachment);

        await LogsPropertyAttachmentsController.create(new Date(), 'ex', 'view', propertyAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        let {
            name,
            received_at,
            expire,
            expire_at,
            property,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            property,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired().nullable(),
            expire_at: Yup.date().required(),
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const propertyAttachment = propertyAttachmentsRepository.create(data);

        await propertyAttachmentsRepository.save(propertyAttachment);

        await LogsPropertyAttachmentsController.create(new Date(), 'ex', 'create', propertyAttachment.id);

        return response.status(201).json(propertyAttachmentView.render(propertyAttachment));
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

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

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

        const propertyAttachment = propertyAttachmentsRepository.create(data);

        await propertyAttachmentsRepository.update(id, propertyAttachment);

        await LogsPropertyAttachmentsController.create(new Date(), 'ex', 'update', propertyAttachment.id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        await propertyAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}