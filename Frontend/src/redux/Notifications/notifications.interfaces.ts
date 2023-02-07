import { AlertProps } from "../../components/Alert/interfaces";
export interface Notification extends AlertProps { message: string; }
interface NotificationsBase{
    [key: string | number]: string | Notification[] | Function;
}
export interface Notifications extends NotificationsBase{
    uuid: string;
    notifications: Array<Notification>;
    count:(notifications:Notification[])=>number;
}
export interface updateStateByKeys { 
    key: keyof Notifications | keyof Notification;
    value: any;
    index?: number;
}