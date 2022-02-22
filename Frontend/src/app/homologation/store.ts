import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import homologationReducer from '../../features/homologation/homologationSlice';

export const store = configureStore({
    reducer: {
        homologation: homologationReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
