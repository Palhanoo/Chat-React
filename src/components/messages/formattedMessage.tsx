import { formatRelative } from "date-fns";
import { Dispatch, FC } from "react";
import {
  MessageItemContainer,
  MessageItemAvatar,
  MessageItemDetails,
  MessageItemHeader,
  MessageItemContent,
  EditMessageInputField,
} from "../../utils/styles";
import { User, MessageType } from "../../utils/types";
import { EditMessageContainer } from "./EditMessageContainer";

type FormattedMessageProps = {
  user: User | undefined;
  message: MessageType;
  key: number;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selectedEditMessage: MessageType | null;
  isEditing: boolean;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormattedMessage: FC<FormattedMessageProps> = ({
  user,
  message,
  onContextMenu,
  isEditing,
  selectedEditMessage,
  onEditMessageChange,
}) => {
  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? "#757575" : "#5e8bff",
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        {/* <MessageItemContent padding="8px 0 0 0">
          {message.content}
        </MessageItemContent> */}
        {isEditing && message.id === selectedEditMessage?.id ? (
          <MessageItemContent padding="8px 0 0 0">
            <EditMessageContainer
              selectedEditMessage={selectedEditMessage}
              onEditMessageChange={onEditMessageChange}
            />
          </MessageItemContent>
        ) : (
          <MessageItemContent padding="8px 0 0 0">
            {message.content}
          </MessageItemContent>
        )}
      </MessageItemDetails>
    </MessageItemContainer>
  );
};
