import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../components/messages/MessagePanel";
import { AppDispatch, RootState } from "../store";
import { updateLastMessage } from "../store/conversationSlice";
import { addMessage, fetchMessagesThunk } from "../store/messageSlice";
import { AuthContext } from "../utils/context/AuthContext";
import { SocketContext } from "../utils/context/SocketContext";
import { ConversationChannelPageStyle } from "../utils/styles";
import { MessageEventPayload, MessageType } from "../utils/types";

export const ConversationChannelPage = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

  const sendTypingStatus = () => {
    console.log("typing");

    socket.emit("onUserTyping", { conversationId: id });
  };

  return (
    <ConversationChannelPageStyle>
      <MessagePanel sendTypingStatus={sendTypingStatus}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
