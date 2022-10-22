import { FC } from "react";
import { MessagePanelBody, MessagePanelStyle } from "../../utils/styles";
import { MessageType } from "../../utils/types";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
  messages: MessageType[];
};

export const MessagePanel: FC<Props> = ({ messages }) => {
  return (
    <MessagePanelStyle>
      <MessagePanelHeader></MessagePanelHeader>
      <MessagePanelBody>
        <MessageContainer messages={messages} />
        <MessageInputField />
      </MessagePanelBody>
    </MessagePanelStyle>
  );
};
