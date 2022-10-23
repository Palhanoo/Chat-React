import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversationMessages, getConversations } from "../utils/api";
import { ConversationMessage, ConversationType } from "../utils/types";

// Define a type for the slice state
interface ConversationsState {
  conversations: ConversationType[];
  messages: ConversationMessage[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: ConversationsState = {
  conversations: [],
  messages: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "coversations/fetch",
  async () => {
    return getConversations();
  }
);

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation");
      // state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
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
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addConversation } = conversationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;
