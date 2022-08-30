import React from "react";
import { ConversationSideBarStyle } from "../../utils/styles";
import { TbEdit } from 'react-icons/tb'

export const ConversationSidebar = () => {
  return (
    <ConversationSideBarStyle>
      <header>
        <h1>Conversations</h1>
        <TbEdit size={40} />
      </header>
    </ConversationSideBarStyle>
  );
};
