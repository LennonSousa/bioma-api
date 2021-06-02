import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import licensingAttachmentView from '../views/licensingAttachmentView';
import { LicensingAttachmentsRepository } from '../repositories/LicensingAttachmentsRepository';
import LogsLicensingAttachmentsController from '../controllers/LogsLicensingAttachmentsController';

export default {
    async index(request: Request, response: Response) {
        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const licensingAttachments = await licensingAttachmentsRepository.find({
            order: {
                received_at: "ASC"
            }
        });

        return response.json(licensingAttachmentView.renderMany(licensingAttachments));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const licensingAttachment = await licensingAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'licensing',
            ]
        });

        const download = licensingAttachmentView.renderDownload(licensingAttachment);

        await LogsLicensingAttachmentsController.create(new Date(), 'ex', 'view', licensingAttachment.id);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        let {
            name,
            received_at,
            expire,
            expire_at,
            licensing,
        } = request.body;

        if (expire)
            expire = Yup.boolean().cast(expire);

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            expire,
            expire_at,
            licensing,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            expire: Yup.boolean().notRequired().nullable(),
            expire_at: Yup.date().required(),
            licensing: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingAttachment = licensingAttachmentsRepository.create(data);

        await licensingAttachmentsRepository.save(licensingAttachment);

        await LogsLicensingAttachmentsController.create(new Date(), 'ex', 'create', licensingAttachment.id);

        return response.status(201).json(licensingAttachmentView.render(licensingAttachment));
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

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

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

        const licensingAttachment = licensingAttachmentsRepository.create(data);

        await licensingAttachmentsRepository.update(id, licensingAttachment);

        await LogsLicensingAttachmentsController.create(new Date(), 'ex', 'update', licensingAttachment.id);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        await licensingAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}