import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './user/auth/auth-slice';
import { notificationReducer } from './notification/notification-slice';
import { placesReducer } from './places/places-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    places: placesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
