import cron from 'node-cron';
import { getCustomRepository } from 'typeorm';
import { formatDistanceToNow } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import { UsersRepository } from '../repositories/UsersRepository';
import CustomerAttachmentsController from '../controllers/CustomerAttachmentsController';
import mailer, { DocumentsListProps } from './mailer';

class Tasks {
    async scheduleDailyNotifications() {
        cron.schedule('11 20 * * *', async () => {
            console.log('> Running a daily task');

            const userRepository = getCustomRepository(UsersRepository);

            const users = await userRepository.find({
                where: { active: true, paused: false }
            });

            users.forEach(async user => {
                const customerAttachments = await CustomerAttachmentsController.index();

                let documents = customerAttachments.map(attachment => {
                    return {
                        title: attachment.customer.name,
                        subTitle: `${attachment.name} - expira ${formatDistanceToNow(new Date(attachment.expire_at), { addSuffix: true, locale: br })}`,
                    }
                });

                let customerDocumentsList: DocumentsListProps = {
                    type: "customers",
                    documents,
                };

                let documentsList = [];

                documentsList.push(customerDocumentsList);

                if (documentsList.length > 0) {
                    await mailer.sendDailyNotificationEmail(
                        user.name,
                        user.email,
                        [{
                            type: "customers",
                            documents: [
                                {
                                    title: "cliente 01",
                                    subTitle: "documento 01 - expira em 22/06-2021"
                                },
                                {
                                    title: "cliente 01",
                                    subTitle: "documento 02 - expira em 03/07-2021"
                                }
                            ]
                        },
                        {
                            type: "projects",
                            documents: [
                                {
                                    title: "cliente A",
                                    subTitle: "documento dsf - expira em 22/06-2021"
                                },
                                {
                                    title: "cliente B",
                                    subTitle: "documento 02 - expira em 03/07-2021"
                                }
                            ]
                        }
                        ],
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