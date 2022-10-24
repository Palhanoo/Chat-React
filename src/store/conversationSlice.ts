import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getConversations } from "../utils/api";
import { ConversationType } from "../utils/types";

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

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation");
      state.conversations.push(action.payload);
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
      });
  },
});

export const { addConversation } = conversationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;
