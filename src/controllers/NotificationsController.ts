import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import notificationView from '../views/notificationView';
import { NotificationsRepository } from '../repositories/NotificationsRepository';

interface NotificationsProps {
    title: string,
    sub_title: string,
    read: boolean,
    user: string,
}

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const notification = await notificationsRepository.find({
            where: { user: id },
            order: {
                created_at: "ASC"
            }
        });

        return response.json(notificationView.renderMany(notification));
    },

    async show(id: string) {
        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const notification = await notificationsRepository.find({
            where: { user: id },
            order: {
                created_at: "ASC"
            }
        });

        return notification;
    },

    async create({ title, sub_title, read, user }: NotificationsProps) {
        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const data = {
            title,
            sub_title,
            read,
            user: user as any,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            sub_title: Yup.string().required(),
            read: Yup.boolean().notRequired(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const notification = notificationsRepository.create(data);

        await notificationsRepository.save(notification);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
            sub_title,
            read,
        } = request.body;

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const data = {
            title,
            sub_title,
            read,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            sub_title: Yup.string().required(),
            read: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const notification = notificationsRepository.create(data);

        await notificationsRepository.update(id, notification);

        return response.status(204).json();
    },

    async delete(id: string) {
        const notificationsRepository = getCustomRepository(NotificationsRepository);

        await notificationsRepository.delete(id);
    }
}