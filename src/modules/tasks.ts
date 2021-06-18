import cron from 'node-cron';
import { getCustomRepository } from 'typeorm';
import { formatDistanceToNow } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import { UsersRepository } from '../repositories/UsersRepository';
import CustomerAttachmentsController from '../controllers/CustomerAttachmentsController';
import LicensingAttachmentsController from '../controllers/LicensingAttachmentsController';
import ProjectAttachmentsController from '../controllers/ProjectAttachmentsController';
import PropertyAttachmentsController from '../controllers/PropertyAttachmentsController';
import NotificationsController from '../controllers/NotificationsController';
import mailer from './mailer';

class Tasks {
    async scheduleDailyNotifications() {
        cron.schedule('16 15 * * *', async () => {
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
                    const document = `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`;

                    NotificationsController.create({
                        title: `Cliente ${attachment.customer.name} - documentos próximos de expirar.`,
                        sub_title: document,
                        user: user.id,
                        item: 'customers',
                        item_id: attachment.customer.id
                    });

                    return {
                        item: attachment.customer.name,
                        document,
                    }
                });

                const licensingAttachmentsOnUser = licensingAttachments.filter(attachment => {
                    return attachment.licensing.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const licensingDocuments = licensingAttachmentsOnUser.map(attachment => {
                    const document = `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`;

                    NotificationsController.create({
                        title: `Licenciamento ${attachment.licensing.customer.name} - documentos próximos de expirar.`,
                        sub_title: document,
                        user: user.id,
                        item: 'licensings',
                        item_id: attachment.licensing.id
                    });

                    return {
                        item: attachment.licensing.customer.name,
                        document,
                    }
                });

                const projectAttachmentsOnUser = projectAttachments.filter(attachment => {
                    return attachment.project.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const projectDocuments = projectAttachmentsOnUser.map(attachment => {
                    const document = `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`;

                    NotificationsController.create({
                        title: `Projeto ${attachment.project.customer.name} - documentos próximos de expirar.`,
                        sub_title: document,
                        user: user.id,
                        item: 'projects',
                        item_id: attachment.project.id
                    });

                    return {
                        item: attachment.project.customer.name,
                        document,
                    }
                });

                const propertyAttachmentsOnUser = propertyAttachments.filter(attachment => {
                    return attachment.property.members.find(member => {
                        return member.user.id === user.id
                    })
                });

                const propertyDocuments = propertyAttachmentsOnUser.map(attachment => {
                    const document = `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`;

                    NotificationsController.create({
                        title: `Imóvel ${attachment.property.name} - documentos próximos de expirar.`,
                        sub_title: document,
                        user: user.id,
                        item: 'properties',
                        item_id: attachment.property.id
                    });

                    return {
                        item: attachment.property.name,
                        document,
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
                        console.log('Mail sent to ', user.name);
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