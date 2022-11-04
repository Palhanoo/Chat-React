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

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

  useEffect(() => {
    const conversationId = id!;
    socket.emit("onConversationJoin", { conversationId });
    socket.on("userJoin", () => {
      console.log("userJoin");
    });
    socket.on("userLeave", () => {
      console.log("userLeave");
    });

    socket.on("onTypingStart", () => {
      // console.log("onTypingStart: User has started typing...");
      setIsRecipientTyping(true);
    });

    socket.on("onTypingStop", () => {
      // console.log("onTypingStop: User has stopped typing...");
      setIsRecipientTyping(false);
    });

    return () => {
      socket.emit("onConversationLeave", { conversationId });
      socket.off("userJoin");
      socket.off("userLeave");
      socket.off("onTypingStart");
      socket.off("onTypingStop");
    };
  }, [id]);

  const sendTypingStatus = () => {
    // console.log("You are typing");
    socket.emit("onUserTyping", { conversationId: id });
    if (isTyping) {
      // console.log("isTyping = true");
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          // console.log("User stopped typing");
          socket.emit("onTypingStop", { conversationId: id });
          setIsTyping(false);
        }, 2000)
      );
    } else {
      // console.log("isTyping = false");
      setIsTyping(true);
      socket.emit("onTypingStart", { conversationId: id });
    }
    // clearTimeout(timer);
    // socket.emit('onUserTyping', { conversationId: id });
    // setTimer(setTimeout(() => console.log('User stopped typing'), 2000));
  };

  return (
    <ConversationChannelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      ></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
