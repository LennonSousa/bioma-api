import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import propertyView from '../views/propertyView';
import { PropertiesRepository } from '../repositories/PropertiesRepository';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;

        const propertiesRepository = getCustomRepository(PropertiesRepository);

        const properties = await propertiesRepository.find({
            where: { customer: id },
            relations: [
                'customer',
            ],
            order: {
                created_at: "ASC"
            }
        });

        return response.json(propertyView.renderMany(properties));
    },
}