import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../components/messages/MessagePanel";
import { AppDispatch, RootState } from "../store";
import { fetchMessagesThunk } from "../store/messageSlice";
import { getConversationMessages } from "../utils/api";
import { AuthContext } from "../utils/context/AuthContext";
import { SocketContext } from "../utils/context/SocketContext";
import { ConversationChannelPageStyle } from "../utils/styles";
import { MessageEventPayload, MessageType } from "../utils/types";

export const ConversationChannelPage = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

  useEffect(() => {
    socket.on("connected", () => console.log("connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, ...message } = payload;
      console.log("message received", message);
      setMessages((prev) => [message, ...prev]);
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, []);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
