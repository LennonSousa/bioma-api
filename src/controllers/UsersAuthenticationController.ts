import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UsersModel from '../models/UsersModel';
import userView from '../views/userView';
import LogsUsersController from '../controllers/LogsUsersController';

require('dotenv/config');

export default {
    async create(request: Request, response: Response) {
        const {
            email,
            password,
        } = request.body;

        const usersRepository = getRepository(UsersModel);

        const data = {
            email,
            password
        };

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const userAuth = await usersRepository.findOne({
            where: [
                { email, active: 1, paused: 0 }
            ],
            relations: [
                'roles',
                'notifications',
            ]
        });

        if (!userAuth)
            return response.status(401).json({
                error: 'User e-mail or password dosen\'t exists.'
            });

        if (!await bcrypt.compare(password, userAuth.password)) {
            await LogsUsersController.create("users", "view_self", request, userAuth.id, "Login denied");

            return response.status(401).json({
                error: 'User e-mail or password dosen\'t exists.'
            });
        }

        if (process.env.USER_JWT_SECRET) {
            const token = jwt.sign({ id: userAuth.id }, process.env.USER_JWT_SECRET, {
                expiresIn: "1d"
            });

            await LogsUsersController.create("users", "view_self", request, userAuth.id, "Login successfully");

            return response.status(201).json({ user: userView.render(userAuth), token: token });
        }

        return response.status(500).json({ message: 'Internal server error' });
    },
}