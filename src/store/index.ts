import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversationSlice";
import messageReducer from "./messageSlice";
import selectedTypeReducer from "./selectedSlice";
import groupsReducer from "./groupSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    messages: messageReducer,
    selectedConversationType: selectedTypeReducer,
    groups: groupsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
