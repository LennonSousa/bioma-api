import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAfter } from 'date-fns';
import mailer from '../modules/mailer';

import { UsersRepository } from '../repositories/UsersRepository';
import { CustomerAttachmentsRepository } from '../repositories/CustomerAttachmentsRepository';
import { SharesCustomerAttachmentsRepository } from '../repositories/SharesCustomerAttachmentRepository';
import customerAttachmentView from '../views/customerAttachmentView';
import UsersRolesController from './UsersRolesController';
import LogsCustomerAttachmentsController from './LogsCustomerAttachmentsController';

export default {
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
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            email,
            expire_at,
            attachment,
        } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(user_id);

        const attachmentRepository = getCustomRepository(CustomerAttachmentsRepository);
        const attachmentFile = await attachmentRepository.findOneOrFail(attachment);

        const sharesCustomerAttachmentRepository = getCustomRepository(SharesCustomerAttachmentsRepository);

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

        const shareAttachment = sharesCustomerAttachmentRepository.create(data);

        await sharesCustomerAttachmentRepository.save(shareAttachment);

        try {
            await mailer.sendShareAttachment(
                user.name,
                email,
                attachmentFile.name,
                `${process.env.APP_URL}/shares/auth?item=customers&share=${shareAttachment.id}&token=${tempPassword}`
            ).then(async () => {
                await LogsCustomerAttachmentsController.create(user_id, 'update', request, attachmentFile.id);

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

        const sharesCustomerAttachmentRepository = getCustomRepository(SharesCustomerAttachmentsRepository);

        const foundShareAttachment = await sharesCustomerAttachmentRepository.findOneOrFail(id, {
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

        const shareAttachment = sharesCustomerAttachmentRepository.create({
            activated: true,
            activated_at: new Date(),
        });

        await sharesCustomerAttachmentRepository.update(foundShareAttachment.id, shareAttachment);

        return response.status(200).json({ attachment: customerAttachmentView.render(foundShareAttachment.attachment), token: newToken });
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "customers", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const sharesCustomerAttachmentRepository = getCustomRepository(SharesCustomerAttachmentsRepository);

        const shareAttachment = await sharesCustomerAttachmentRepository.findOneOrFail(id, {
            relations: ['attachment'],
        });

        await sharesCustomerAttachmentRepository.delete(id);

        await LogsCustomerAttachmentsController.create(user_id, 'update', request, shareAttachment.attachment.id);

        return response.status(204).send();
    }
}