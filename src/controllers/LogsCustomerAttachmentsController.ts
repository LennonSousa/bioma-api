import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import requestIp from 'request-ip';
import geoIp from 'geoip-lite';

import { LogsCustomerAttachmentsRepository } from '../repositories/LogsCustomerAttachmentsRepository';

export default {
    async create(accessed_at: Date, user: string, action: string, attachment: any) {
        const logsCustomerAttachmentsRepository = getCustomRepository(LogsCustomerAttachmentsRepository);

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

        const logCustomerAttachment = logsCustomerAttachmentsRepository.create(data);

        await logsCustomerAttachmentsRepository.save(logCustomerAttachment);
    },
}