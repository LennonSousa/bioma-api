import { Request, Response } from 'express';
import { getCustomRepository, LessThan } from 'typeorm';
import * as Yup from 'yup';

import customerView from '../views/customerView';
import { CustomersRepository } from '../repositories/CustomersRepository';

import projectView from '../views/projectView';
import { ProjectsRepository } from '../repositories/ProjectsRepository';

import licensingView from '../views/licensingView';
import { LicensingsRepository } from '../repositories/LicensingsRepository';

export default {
    async banks(request: Request, response: Response) {
        const { institution } = request.query;

        const data = {
            institution
        };

        const schema = Yup.object().shape({
            institution: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const projects = await projectsRepository.find({
            order: {
                created_at: "DESC"
            },
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'status',
            ]
        });

        const filteredProjects = projects.filter(project => { return project.bank.institution.id === institution });

        return response.json(projectView.renderMany(filteredProjects));
    },

    async customers(request: Request, response: Response) {
        const { warnings } = request.query;

        const warning = Yup.boolean().cast(warnings);

        const data = {
            warning
        };

        const schema = Yup.object().shape({
            warning: Yup.boolean().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.find({
            where: { warnings: warning },
            order: {
                created_at: "DESC"
            }
        });

        return response.json(customerView.renderMany(customers));
    },

    async licensings(request: Request, response: Response) {
        const { status, infringements } = request.query;

        if (status) {
            const data = {
                status
            };

            const schema = Yup.object().shape({
                status: Yup.string().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const licensingsRepository = getCustomRepository(LicensingsRepository);

            if (status === "all") {
                const licensings = await licensingsRepository.find({
                    relations: [
                        'customer',
                        'authorization',
                        'agency',
                        'status',
                        'infringement',
                    ],
                    order: {
                        updated_at: "DESC"
                    }
                });

                return response.json(licensingView.renderMany(licensings));
            }

            const licensings = await licensingsRepository.find({
                where: { status },
                relations: [
                    'customer',
                    'authorization',
                    'agency',
                    'status',
                    'infringement',
                ],
                order: {
                    updated_at: "DESC"
                }
            });

            return response.json(licensingView.renderMany(licensings));
        }

        const infringement = Yup.boolean().cast(infringements);

        const data = {
            infringement
        };

        const schema = Yup.object().shape({
            infringement: Yup.boolean().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const licensingsRepository = getCustomRepository(LicensingsRepository);

        const licensings = await licensingsRepository.find({
            relations: [
                'customer',
                'authorization',
                'agency',
                'status',
                'infringement',
            ],
            order: {
                updated_at: "DESC"
            }
        });

        if (infringement) {
            const filteredLicensings = licensings.filter(project => { return !!project.infringement });

            return response.json(licensingView.renderMany(filteredLicensings));
        }

        const filteredLicensings = licensings.filter(project => { return !!!project.infringement });

        return response.json(licensingView.renderMany(filteredLicensings));
    },

    async projects(request: Request, response: Response) {
        const { status, bank } = request.query;

        if (status) {
            const data = {
                status
            };

            const schema = Yup.object().shape({
                status: Yup.string().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const projectsRepository = getCustomRepository(ProjectsRepository);

            const projects = await projectsRepository.find({
                where: { status },
                relations: [
                    'customer',
                    'bank',
                    'bank.institution',
                    'status',
                ],
                order: {
                    updated_at: "DESC"
                }
            });

            return response.json(projectView.renderMany(projects));
        }

        const data = {
            bank
        };

        const schema = Yup.object().shape({
            bank: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const projects = await projectsRepository.find({
            where: { bank },
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'status',
            ],
            order: {
                updated_at: "DESC"
            }
        });

        return response.json(projectView.renderMany(projects));
    },

    async properties(request: Request, response: Response) {
        const { property } = request.query;

        const data = {
            property
        };

        const schema = Yup.object().shape({
            property: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const projects = await projectsRepository.find({
            where: { property },
            relations: [
                'customer',
                'bank',
                'bank.institution',
                'status',
            ],
            order: {
                updated_at: "DESC"
            }
        });

        return response.json(projectView.renderMany(projects));
    },
}