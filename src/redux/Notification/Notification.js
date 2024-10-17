import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload); // Add the new notification
    },
    clearNotifications: (state) => {
      console.log(state.notifications); // Add this line
      return []; // Clear all notifications
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
