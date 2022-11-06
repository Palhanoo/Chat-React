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
import { fetchGroupsThunk } from "../store/groupSlice";
import { addMessage, deleteMessage } from "../store/messageSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { Page } from "../utils/styles";
import { Conversation, MessageEventPayload } from "../utils/types";

export const ConversationPage = () => {
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroupsThunk());
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, ...message } = payload;
      dispatch(addMessage(payload));
      dispatch(updateLastMessage(conversation));
    });
    socket.on("onConversation", (payload: Conversation) => {
      console.log(payload);
      dispatch(addConversation(payload));
    });
    socket.on("onMessageDelete", (payload) => {
      console.log("Message Deleted");
      console.log(payload);
      dispatch(deleteMessage(payload));
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
      socket.off("onConversation");
      socket.off("onMessageDelete");
    };
  }, [id]);

  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
