import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import requestIp from 'request-ip';

import { LogsProjectAttachmentsRepository } from '../repositories/LogsProjectAttachmentsRepository';
import { Grant } from '../controllers/UsersRolesController';
import { UsersRepository } from '../repositories/UsersRepository';

export default {
    async create(userId: string, action: Grant, request: Request, attachmentId: string) {
        const clientIp = requestIp.getClientIp(request);

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOneOrFail(userId);

        const logsProjectAttachmentsRepository = getCustomRepository(LogsProjectAttachmentsRepository);

        const data = {
            accessed_at: new Date(),
            user: user.name,
            action,
            client_ip: clientIp,
            attachment: attachmentId as any,
        };

        const schema = Yup.object().shape({
            accessed_at: Yup.date().required(),
            user: Yup.string().required(),
            action: Yup.string().required(),
            client_ip: Yup.string().required(),
            attachment: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const logProjectAttachment = logsProjectAttachmentsRepository.create(data);

        await logsProjectAttachmentsRepository.save(logProjectAttachment);
    },
}