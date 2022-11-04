import React, { useContext, useEffect, useState } from "react";
import {
  EditMessageInputField,
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemContent,
} from "../../utils/styles";
import { MessageType, User } from "../../utils/types";
import { AuthContext } from "../../utils/context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useParams } from "react-router-dom";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import { SelectedMessageContextMenu } from "../context-menus/SelectedMessageContextMenu";
import { FormattedMessage } from "./formattedMessage";
import { EditMessageContainer } from "./EditMessageContainer";

type Props = {
  messages: MessageType[];
};

export const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [selectedEditMessage, setSelectedEditMessage] =
    useState<MessageType | null>(null);
  const [originalEditMessage, setOriginalEditMessage] =
    useState(selectedEditMessage);
  const [isEditing, setIsEditing] = useState(false);

  const conversationMessages = useSelector(
    (state: RootState) => state.messages.messages
  );

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setPoints({ x: e.pageX, y: e.pageY });
    setSelectedMessage(message);
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEditMessage) return;
    setSelectedEditMessage(
      (prev) =>
        prev && {
          ...prev,
          content: e.target.value,
        }
    );
  };

  useEffect(() => {
    const handleClick = () => setShowMenu(false);

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsEditing(false);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [id]);

  useEffect(() => {
    return () => {
      setSelectedMessage(null);
      setSelectedEditMessage(null);
      setIsEditing(false);
    };
  }, [id]);

  const formatMessages = () => {
    const msgs = conversationMessages.find((cm) => cm.id === parseInt(id!));
    if (!msgs) return;
    return msgs.messages.map((m, index, arr) => {
      const nextIndex = index + 1;
      const currentMessage = arr[index];
      const nextMessage = arr[nextIndex];
      if (arr.length === nextIndex) {
        return (
          <FormattedMessage
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
            user={user}
            message={m}
            isEditing={isEditing}
            selectedEditMessage={selectedEditMessage}
            onEditMessageChange={onEditMessageChange}
            setIsEditing={setIsEditing}
          />
        );
      }
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
          >
            {isEditing && m.id === selectedEditMessage?.id ? (
              <MessageItemContent padding="0 0 0 70px">
                <EditMessageContainer
                  setIsEditing={setIsEditing}
                  selectedEditMessage={selectedEditMessage}
                  onEditMessageChange={onEditMessageChange}
                />
              </MessageItemContent>
            ) : (
              <MessageItemContent padding="0 0 0 70px">
                {m.content}
              </MessageItemContent>
            )}
          </MessageItemContainer>
        );
      } else {
        return (
          <FormattedMessage
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
            user={user}
            message={m}
            isEditing={isEditing}
            selectedEditMessage={selectedEditMessage}
            onEditMessageChange={onEditMessageChange}
            setIsEditing={setIsEditing}
          />
        );
      }
    });
  };

  useEffect(() => {
    formatMessages();
  }, []);

  return (
    <MessageMenuContext.Provider
      value={{
        message: selectedMessage,
        editMessage: selectedEditMessage,
        setMessage: setSelectedMessage,
        setEditMessage: setSelectedEditMessage,
      }}
    >
      <MessageContainerStyle>
        <>{formatMessages()}</>
        {showMenu && (
          <SelectedMessageContextMenu
            setIsEditing={setIsEditing}
            points={points}
          />
        )}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
};
