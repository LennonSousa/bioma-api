import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import requestIp from 'request-ip';

import { LogsProjectsRepository } from '../repositories/LogsProjectsRepository';
import { Grant } from '../controllers/UsersRolesController';
import { UsersRepository } from '../repositories/UsersRepository';

export default {
    async create(userId: string, request: Request, action: Grant, projectId: string, description?: string) {
        const clientIp = requestIp.getClientIp(request);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(userId);

        const logsProjectsRepository = getCustomRepository(LogsProjectsRepository);

        const data = {
            accessed_at: new Date(),
            user: user.name,
            action,
            description,
            client_ip: clientIp,
            project: projectId as any,
        };

        const schema = Yup.object().shape({
            accessed_at: Yup.date().required(),
            user: Yup.string().required(),
            action: Yup.string().required(),
            description: Yup.string().notRequired(),
            client_ip: Yup.string().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const logProject = logsProjectsRepository.create(data);

        await logsProjectsRepository.save(logProject);
    },
}