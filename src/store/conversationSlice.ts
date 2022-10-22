import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationType } from "../utils/types";

// Define a type for the slice state
interface ConversationsState {
  conversations: ConversationType[];
}

// Define the initial state using that type
const initialState: ConversationsState = {
  conversations: [],
};

export const conversationsSlice = createSlice({
  name: "conversations",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("addConversation");
      state.conversations.push(action.payload);
    },
  },
});

export const { addConversation } = conversationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default conversationsSlice.reducer;
