import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import requestIp from 'request-ip';

import { LogsUsersRepository } from '../repositories/LogsUsersRepository';
import { Role, Grant } from '../controllers/UsersRolesController';

export default {
    async create(item: Role, action: Grant, request: Request, userId: string, description?: string) {
        const logsUsersRepository = getCustomRepository(LogsUsersRepository);

        const clientIp = requestIp.getClientIp(request);

        const data = {
            accessed_at: new Date(),
            item,
            description,
            action,
            client_ip: clientIp,
            user: userId as any,
        };

        const schema = Yup.object().shape({
            accessed_at: Yup.date().required(),
            item: Yup.string().required(),
            description: Yup.string().notRequired(),
            action: Yup.string().required(),
            client_ip: Yup.string().required(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const logUser = logsUsersRepository.create(data);

        await logsUsersRepository.save(logUser);
    },
}