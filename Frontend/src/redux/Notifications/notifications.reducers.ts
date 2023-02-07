import { PayloadAction } from "@reduxjs/toolkit";

import { Notifications ,Notification,UpdateStateByKeys} from "./notifications.interfaces";

export const reducers = {
    updateNotifications: (state: Notifications, { payload: { key, value } }: PayloadAction<UpdateStateByKeys>) => {
        if(key!==undefined && value!==undefined ){
            state[key] = value;
        }
    },
    addNotification: (state: Notifications, { payload }: PayloadAction<Notification>) => {
		if(payload!==undefined ){
            state.notifications.push(payload);
        }
    },
    rmNotification: (state: Notifications, { payload }: PayloadAction<number>) => {
        if(payload!==undefined ){
            state.notifications.splice(payload,1);
        }
    },
    updateNotification: (state: Notifications, { payload: { key, value, index } }: PayloadAction<UpdateStateByKeys>) => {
        if(key!==undefined && value!==undefined && index!==undefined ){
            state.notifications[index][key] = value ;
        }
    }
}