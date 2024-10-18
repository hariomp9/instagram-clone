import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "LikeNotify",
  initialState: {},
  reducers: {
    addLikeNotify: (state, action) => {
      state.likeNotification = action.payload; // Add individual notification
    },
    clearLikeNotify: (state) => {
      state.likeNotification = null; // Clear notification
    },
  },
});

export const { addLikeNotify, clearLikeNotify } = likeSlice.actions;
export default likeSlice.reducer;
