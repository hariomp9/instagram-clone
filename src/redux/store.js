import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice";
import postReducer from "./postSlice";
import userReducer from "./authSlice";
import chatReducer from "./chatSlice";
import socketSlice from "./socketSlice";
import rtnSlice from "./rtnSlice";
import notificationReducer from "./Notification/Notification"; 

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "Auth",
    "Post",
    "userAuth",
    "Chat",
    "Socketio",
    "realTimeNotification",
    "notifications", 
  ],
};

const rootReducer = combineReducers({
  Auth: authReducer,
  Post: postReducer,
  userAuth: userReducer,
  Chat: chatReducer,
  socketio: socketSlice,
  realTimeNotification: rtnSlice,
  notifications: notificationReducer, // Add the notification reducer here
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
