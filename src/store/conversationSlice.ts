import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations } from "../utils/api";
import { ConversationType } from "../utils/types";

// Define a type for the slice state
interface ConversationsState {
  conversations: Map<string, ConversationType>;
}

// Define the initial state using that type
const initialState: ConversationsState = {
  conversations: new Map(),
};

export const fetchConversationsThunk = createAsyncThunk(
  "coversations/fetch",
  async () => {
    return getConversations();
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation");
      // state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach((conversation) => {
        console.log(conversation);
        state.conversations.set(conversation.id.toString(), conversation);
      });
      console.log(state.conversations);
      // state.conversations = action.payload.data;
    });
  },
});

export const { addConversation } = conversationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;
