import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mailer from '../modules/mailer';

import userView from '../views/userView';
import { UsersRepository } from '../repositories/UsersRepository';

export default {
    async index(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find({
            relations: ['roles'],
            order: {
                created_at: "ASC"
            },
        });

        return response.json(userView.renderMany(users));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOneOrFail(id, {
            relations: [
                'roles',
                'notifications',
            ]
        });

        return response.json(userView.render(user));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            phone,
            email,
            roles
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const data = {
            name,
            phone,
            email,
            roles
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            phone: Yup.string().notRequired(),
            email: Yup.string().required(),
            roles: Yup.array(
                Yup.object().shape({
                    role: Yup.string().required(),
                    view: Yup.boolean().notRequired(),
                    view_self: Yup.boolean().notRequired(),
                    create: Yup.boolean().notRequired(),
                    update: Yup.boolean().notRequired(),
                    update_self: Yup.boolean().notRequired(),
                    remove: Yup.boolean().notRequired(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const tempPassword = crypto.randomBytes(10).toString('hex');
        const hash = await bcrypt.hash(tempPassword, 10);

        const newUser = usersRepository.create({
            name,
            phone,
            email,
            password: hash,
            active: false,
            paused: false,
            roles
        });

        const foundUser = await usersRepository.findOne({
            where: [
                { email }
            ]
        });

        if (foundUser && foundUser.active) return response.status(400).json({ error: 'User already exists and activated!' });

        if (foundUser && !foundUser.active) return response.status(400).json({ error: 'User not activated!' });

        // If dosen't exists, create a new user with a temporary password and send a e-mail.
        if (!foundUser) await usersRepository.save(newUser);
        else if (!foundUser.active) {
            const { id } = foundUser;

            await usersRepository.update(id, newUser);
        }

        await mailer.sendNewUserEmail(name, email, `${process.env.APP_URL}/users/new/auth?email=${email}&token=${tempPassword}`).then(() => {
            return response.status(201).json();
        });
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            phone,
            paused,
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const data = {
            name,
            phone,
            paused,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            phone: Yup.string().notRequired().nullable(),
            paused: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const user = usersRepository.create(data);

        await usersRepository.update(id, user);

        return response.status(204).json(user);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        await usersRepository.delete(id);

        return response.status(204).send();
    }
}