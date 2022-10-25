import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations, postNewConversation } from "../utils/api";
import { ConversationType, CreateConversationParams } from "../utils/types";

// Define a type for the slice state
interface ConversationsState {
  conversations: ConversationType[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "coversations/fetch",
  async () => {
    return getConversations();
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversation/create",
  async (data: CreateConversationParams) => {
    return postNewConversation(data);
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation");
      state.conversations.push(action.payload);
    },
    updateLastMessage: (state, action: PayloadAction<ConversationType>) => {
      const conversation = action.payload;
      const index = state.conversations.findIndex(
        (c) => c.id === conversation.id
      );
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
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
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
      });
  },
});

export const { addConversation, updateLastMessage } =
  conversationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;
