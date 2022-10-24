import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConversationMessages } from "../utils/api";
import { ConversationMessage } from "../utils/types";

export interface MessageState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessageState = {
  messages: [
    {
      id: 1,
      messages: [],
    },
  ],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  (id: number) => {
    return getConversationMessages(id);
  }
);

export const messagesSlice = createSlice({
  name: "messages_slice",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      const { id, messages } = action.payload.data;
      const index = state.messages.findIndex((cm) => cm.id === id);
      const exists = state.messages.find((c) => c.id === id);
      if (exists) {
        console.log("updating conversation");
        state.messages[index] = action.payload.data;
      } else {
        state.messages.push(action.payload.data);
      }
      state.loading = false;
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
