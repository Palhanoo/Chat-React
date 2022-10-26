import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversations/ConversationPanel";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { AppDispatch, RootState } from "../store";
import {
  addConversation,
  fetchConversationsThunk,
  updateLastMessage,
} from "../store/conversationSlice";
import { addMessage } from "../store/messageSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { Page } from "../utils/styles";
import { ConversationType, MessageEventPayload } from "../utils/types";

export const ConversationPage = () => {
  const socket = useContext(SocketContext);

  const { id } = useParams();
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const conversationsState = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    // console.log(conversationsState.find((c) => c.id === 9));
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    socket.emit("onClientConnect", {
      conversationId: parseInt(id!),
    });
    socket.on("connected", () => console.log("connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, ...message } = payload;
      dispatch(addMessage(payload));
      dispatch(updateLastMessage(conversation));
    });
    socket.on("onConversation", (payload: ConversationType) => {
      console.log(payload);
      dispatch(addConversation(payload));
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
      socket.off("onConversation");
    };
  }, [id]);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
