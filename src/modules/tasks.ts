import cron from 'node-cron';
import { getYear } from 'date-fns';

class Tasks {
    async scheduleDailyNotifications() {
        cron.schedule('0 5 * * *', () => {
            console.log('> Running a daily task');
        }),
        {
            timezone: "America/Sao_Paulo"
        }
    }
}

export default new Tasks();