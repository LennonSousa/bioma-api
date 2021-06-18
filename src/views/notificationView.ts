import Notification from '../models/NotificationsModel';
import user from './userView';

export default {
    render(notification: Notification) {
        return {
            id: notification.id && notification.id,
            title: notification.title,
            sub_title: notification.sub_title,
            read: notification.read,
            created_at: notification.created_at,
            user: notification.user && user.render(notification.user),
            item: notification.item,
            item_id: notification.item_id,
        }
    },

    renderMany(notifications: Notification[]) {
        return notifications.map(notification => this.render(notification));
    }
}