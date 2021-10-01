import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addHours } from 'date-fns';
import mailer from '../modules/mailer';

import { UsersRepository } from '../repositories/UsersRepository';
import { LicensingAttachmentsRepository } from '../repositories/LicensingAttachmentsRepository';
import { SharesLicensingAttachmentsRepository } from '../repositories/SharesLicensingAttachmentRepository';
import licensingAttachmentView from '../views/licensingAttachmentView';
import UsersRolesController from './UsersRolesController';
import LogsLicensingAttachmentsController from './LogsLicensingAttachmentsController';

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const licensingAttachmentsRepository = getCustomRepository(LicensingAttachmentsRepository);

        const licensingAttachment = await licensingAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'licensing',
            ]
        });

        const download = licensingAttachmentView.renderDownload(licensingAttachment);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            email,
            attachment,
        } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const attachmentRepository = getCustomRepository(LicensingAttachmentsRepository);
        const attachmentFile = await attachmentRepository.findOneOrFail(attachment);

        const sharesLicensingAttachmentRepository = getCustomRepository(SharesLicensingAttachmentsRepository);

        const tempPassword = crypto.randomBytes(10).toString('hex');
        const hash = await bcrypt.hash(tempPassword, 10);

        const expire_at = addHours(new Date(), 48);

        const data = {
            email,
            token: hash,
            expire_at,
            created_by: user.name,
            attachment,
        };

        // Validation fields.
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            attachment: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const shareAttachment = sharesLicensingAttachmentRepository.create(data);

        await sharesLicensingAttachmentRepository.save(shareAttachment);

        try {
            await mailer.sendShareAttachment(
                user.name,
                email,
                attachmentFile.name,
                `${process.env.APP_URL}/shares/licensings/auth?share=${shareAttachment.id}&token=${tempPassword}`
            ).then(async () => {
                await LogsLicensingAttachmentsController.create(user_id, 'update', request, attachmentFile.id);

                return response.status(201).json();
            });
        }
        catch (err) {
            return response.status(500).json({ message: 'Internal server error' });
        }
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const { email, token } = request.body;

        const data = {
            id,
            email,
            token
        };

        const schema = Yup.object().shape({
            id: Yup.string().required(),
            email: Yup.string().email().required(),
            token: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const sharesLicensingAttachmentRepository = getCustomRepository(SharesLicensingAttachmentsRepository);

        const foundShareAttachment = await sharesLicensingAttachmentRepository.findOneOrFail(id, {
            where: [
                { email }
            ],
            relations: ['attachment']
        });

        if (new Date() > foundShareAttachment.expire_at) {
            return response.status(400).json({
                error: 'Expired user token!',
                code: 'expired',
            });
        }

        if (!await bcrypt.compare(token, foundShareAttachment.token))
            return response.status(400).json({
                error: 'E-mail or token dosen\'t exists.',
                code: 'invalid',
            });

        const newToken = jwt.sign({ id: foundShareAttachment.id }, process.env.CUSTOMER_JWT_SECRET, {
            expiresIn: "1h"
        });

        const shareAttachment = sharesLicensingAttachmentRepository.create({
            activated: true,
            activated_at: new Date(),
        });

        await sharesLicensingAttachmentRepository.update(foundShareAttachment.id, shareAttachment);

        return response.status(200).json({ attachment: licensingAttachmentView.render(foundShareAttachment.attachment), token: newToken });
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "licensings", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const sharesLicensingAttachmentRepository = getCustomRepository(SharesLicensingAttachmentsRepository);

        const shareAttachment = await sharesLicensingAttachmentRepository.findOneOrFail(id, {
            relations: ['attachment'],
        });

        await sharesLicensingAttachmentRepository.delete(id);

        await LogsLicensingAttachmentsController.create(user_id, 'update', request, shareAttachment.attachment.id);

        return response.status(204).send();
    }
}