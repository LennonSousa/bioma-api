import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import { LogsLicensingAttachmentsRepository } from '../repositories/LogsLicensingAttachmentsRepository';

export default {
    async create(accessed_at: Date, user: string, action: string, attachment: any) {
        const logsLicensingAttachmentsRepository = getCustomRepository(LogsLicensingAttachmentsRepository);

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

        const logLicensingAttachment = logsLicensingAttachmentsRepository.create(data);

        await logsLicensingAttachmentsRepository.save(logLicensingAttachment);
    },
}