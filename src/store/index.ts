import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversationSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
