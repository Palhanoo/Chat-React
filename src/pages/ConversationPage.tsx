import React from "react";
import { Outlet } from "react-router-dom";
import { ConversationPanel } from "../components/conversations/ConversationPanel";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { Page } from "../utils/styles";

export const ConversationPage = () => {

  return (
    <Page>
      <ConversationSidebar />
      <ConversationPanel />
      <Outlet />
    </Page>
  );
};
