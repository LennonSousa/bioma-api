import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import bankView from '../views/bankView';
import { BanksRepository } from '../repositories/BanksRepository';

export default {
    async index(request: Request, response: Response) {
        const banksRepository = getCustomRepository(BanksRepository);

        const banks = await banksRepository.find({
            relations: [
                'institution',
            ]
        });

        return response.json(bankView.renderMany(banks));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const banksRepository = getCustomRepository(BanksRepository);

        const bank = await banksRepository.findOneOrFail(id, {
            relations: [
                'institution',
                'projects',
            ]
        });

        return response.json(bankView.render(bank));
    },

    async create(request: Request, response: Response) {
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
            address: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            sector: Yup.string().required(),
            department: Yup.string().notRequired(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired(),
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
        const { id } = request.params;

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
            address: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            sector: Yup.string().required(),
            department: Yup.string().notRequired(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired(),
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