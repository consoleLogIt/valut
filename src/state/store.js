import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import secretsReducer from "./slices/secretsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    secrets: secretsReducer,  
  },
  devTools: process.env.NODE_ENV !== "production",
});
