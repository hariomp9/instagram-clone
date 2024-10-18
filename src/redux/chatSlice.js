import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "Chat",
  initialState: {
    onlineUsers: [],
    messages: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Add individual message
    },
  
  },
});
export const { setOnlineUsers, setMessages,addMessage } = chatSlice.actions;
export default chatSlice.reducer;
