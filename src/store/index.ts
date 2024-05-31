import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './user/auth/auth-slice';
import { notificationReducer } from './notification/notification-slice';
import { rocketsReducer } from './rockets/rockets-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    rockets: rocketsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
