import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import { LogsProjectAttachmentsRepository } from '../repositories/LogsProjectAttachmentsRepository';

export default {
    async create(accessed_at: Date, user: string, action: string, attachment: any) {
        const logsProjectAttachmentsRepository = getCustomRepository(LogsProjectAttachmentsRepository);

        const data = {
            accessed_at,
            user,
            action,
            attachment,
        };

        const schema = Yup.object().shape({
            accessed_at: Yup.date().required(),
            user: Yup.string().required(),
            action: Yup.string().required(),
            attachment: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const logProjectAttachment = logsProjectAttachmentsRepository.create(data);

        await logsProjectAttachmentsRepository.save(logProjectAttachment);
    },
}