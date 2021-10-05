import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAfter } from 'date-fns';
import mailer from '../modules/mailer';

import { UsersRepository } from '../repositories/UsersRepository';
import { PropertyAttachmentsRepository } from '../repositories/PropertyAttachmentsRepository';
import { SharesPropertyAttachmentsRepository } from '../repositories/SharesPropertyAttachmentRepository';
import propertyAttachmentView from '../views/propertyAttachmentView';
import UsersRolesController from './UsersRolesController';
import LogsPropertyAttachmentsController from './LogsPropertyAttachmentsController';

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const propertyAttachmentsRepository = getCustomRepository(PropertyAttachmentsRepository);

        const propertyAttachment = await propertyAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'property',
            ]
        });

        const download = propertyAttachmentView.renderDownload(propertyAttachment);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            email,
            expire_at,
            attachment,
        } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const attachmentRepository = getCustomRepository(PropertyAttachmentsRepository);
        const attachmentFile = await attachmentRepository.findOneOrFail(attachment);

        const sharesPropertyAttachmentRepository = getCustomRepository(SharesPropertyAttachmentsRepository);

        const tempPassword = crypto.randomBytes(10).toString('hex');
        const hash = await bcrypt.hash(tempPassword, 10);

        const data = {
            email,
            token: hash,
            expire_at,
            created_by: user.name,
            attachment,
        };

        // Validation fields.
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            expire_at: Yup.date().required(),
            attachment: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const shareAttachment = sharesPropertyAttachmentRepository.create(data);

        await sharesPropertyAttachmentRepository.save(shareAttachment);

        try {
            await mailer.sendShareAttachment(
                user.name,
                email,
                attachmentFile.name,
                `${process.env.APP_URL}/shares/propertys/auth?share=${shareAttachment.id}&token=${tempPassword}`
            ).then(async () => {
                await LogsPropertyAttachmentsController.create(user_id, 'update', request, attachmentFile.id);

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

        const sharesPropertyAttachmentRepository = getCustomRepository(SharesPropertyAttachmentsRepository);

        const foundShareAttachment = await sharesPropertyAttachmentRepository.findOneOrFail(id, {
            where: [
                { email }
            ],
            relations: ['attachment']
        });

        if (isAfter(new Date(), foundShareAttachment.expire_at)) {
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

        const shareAttachment = sharesPropertyAttachmentRepository.create({
            activated: true,
            activated_at: new Date(),
        });

        await sharesPropertyAttachmentRepository.update(foundShareAttachment.id, shareAttachment);

        return response.status(200).json({ attachment: propertyAttachmentView.render(foundShareAttachment.attachment), token: newToken });
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "properties", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const sharesPropertyAttachmentRepository = getCustomRepository(SharesPropertyAttachmentsRepository);

        const shareAttachment = await sharesPropertyAttachmentRepository.findOneOrFail(id, {
            relations: ['attachment'],
        });

        await sharesPropertyAttachmentRepository.delete(id);

        await LogsPropertyAttachmentsController.create(user_id, 'update', request, shareAttachment.attachment.id);

        return response.status(204).send();
    }
}