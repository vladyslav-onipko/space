import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationStatus = 'error' | 'success';

interface NotificationState {
  status: NotificationStatus;
  show: boolean;
  message: string;
}

const initialNotificationState: NotificationState = {
  status: 'error',
  show: false,
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    showNotification(state, actions: PayloadAction<{ status: NotificationStatus; message: string }>) {
      state.status = actions.payload.status;
      state.message = actions.payload.message;
      state.show = true;
    },
    closeNotification(state) {
      state.show = false;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { showNotification, closeNotification } = notificationSlice.actions;
