import cron from 'node-cron';
import { getCustomRepository } from 'typeorm';
import { formatDistanceToNow } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import { UsersRepository } from '../repositories/UsersRepository';
import CustomerAttachmentsController from '../controllers/CustomerAttachmentsController';
import LicensingAttachmentsController from '../controllers/LicensingAttachmentsController';
import ProjectAttachmentsController from '../controllers/ProjectAttachmentsController';
import PropertyAttachmentsController from '../controllers/PropertyAttachmentsController';
import mailer from './mailer';

class Tasks {
    async scheduleDailyNotifications() {
        cron.schedule('54 14 * * *', async () => {
            console.log('> Running a daily task');

            const customerAttachments = await CustomerAttachmentsController.index();
            const licensingAttachments = await LicensingAttachmentsController.index();
            const projectAttachments = await ProjectAttachmentsController.index();
            const propertyAttachments = await PropertyAttachmentsController.index();

            const userRepository = getCustomRepository(UsersRepository);

            const users = await userRepository.find({
                where: { active: true, paused: false }
            });

            users.forEach(async user => {
                const customerAttachmentsOnUser = customerAttachments.filter(attachment => {
                    return attachment.customer.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const customerDocuments = customerAttachmentsOnUser.map(attachment => {
                    return {
                        item: attachment.customer.name,
                        document: `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`,
                    }
                });

                const licensingAttachmentsOnUser = licensingAttachments.filter(attachment => {
                    return attachment.licensing.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const licensingDocuments = licensingAttachmentsOnUser.map(attachment => {
                    return {
                        item: attachment.licensing.customer.name,
                        document: `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`,
                    }
                });

                const projectAttachmentsOnUser = projectAttachments.filter(attachment => {
                    return attachment.project.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const projectDocuments = projectAttachmentsOnUser.map(attachment => {
                    return {
                        item: attachment.project.customer.name,
                        document: `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`,
                    }
                });

                const propertyAttachmentsOnUser = propertyAttachments.filter(attachment => {
                    return attachment.property.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const propertyDocuments = propertyAttachmentsOnUser.map(attachment => {
                    return {
                        item: attachment.property.name,
                        document: `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`,
                    }
                });

                if (customerDocuments.length > 0 || licensingDocuments.length > 0
                    || projectDocuments.length > 0 || propertyDocuments.length > 0) {
                    await mailer.sendDailyNotificationEmail(
                        user.name,
                        user.email,
                        customerDocuments,
                        licensingDocuments,
                        projectDocuments,
                        propertyDocuments
                    ).then(() => {
                    });
                }
            });
        }),
        {
            timezone: "America/Sao_Paulo"
        }
    }
}

export default new Tasks();