import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import bankView from '../views/bankView';
import { BanksRepository } from '../repositories/BanksRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { limit = 10, page = 1 } = request.query;

        if (! await UsersRolesController.can(user_id, "banks", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const banksRepository = getCustomRepository(BanksRepository);

        const banks = await banksRepository.find({
            relations: [
                'institution',
            ],
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalItems = await banksRepository.count();

        const totalPages = Math.ceil(totalItems / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(bankView.renderMany(banks));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "banks", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const banksRepository = getCustomRepository(BanksRepository);

        const bank = await banksRepository.findOneOrFail(id, {
            relations: [
                'institution',
                'projects',
                'projects.customer',
                'projects.status',
            ]
        });

        return response.json(bankView.render(bank));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "banks", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            agency,
            address,
            city,
            state,
            sector,
            department,
            phone,
            cellphone,
            institution,
        } = request.body;

        const banksRepository = getCustomRepository(BanksRepository);

        const data = {
            agency,
            address,
            city,
            state,
            sector,
            department,
            phone,
            cellphone,
            institution,
        };

        const schema = Yup.object().shape({
            agency: Yup.string().required(),
            address: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            sector: Yup.string().required(),
            department: Yup.string().notRequired().nullable(),
            phone: Yup.string().notRequired().nullable(),
            cellphone: Yup.string().notRequired().nullable(),
            institution: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const bank = banksRepository.create(data);

        await banksRepository.save(bank);

        return response.status(201).json(bankView.render(bank));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "banks", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            agency,
            address,
            city,
            state,
            sector,
            department,
            phone,
            cellphone,
            institution,
        } = request.body;

        const banksRepository = getCustomRepository(BanksRepository);

        const data = {
            agency,
            address,
            city,
            state,
            sector,
            department,
            phone,
            cellphone,
            institution,
        };

        const schema = Yup.object().shape({
            agency: Yup.string().required(),
            address: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            sector: Yup.string().required(),
            department: Yup.string().notRequired().nullable(),
            phone: Yup.string().notRequired().nullable(),
            cellphone: Yup.string().notRequired().nullable(),
            institution: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const bank = banksRepository.create(data);

        await banksRepository.update(id, bank);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const banksRepository = getCustomRepository(BanksRepository);

        await banksRepository.delete(id);

        return response.status(204).send();
    }
}