import { v4 as uuidv4 } from 'uuid';
import { Notifications } from './notifications.interfaces';
export const initialState: Notifications = {
    uuid: uuidv4(),
    notifications: [
        
    ],
    count: (notifications: Notification[]) => notifications.length
}