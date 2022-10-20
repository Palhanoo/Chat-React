import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ConversationPanel } from "../components/conversations/ConversationPanel";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { getAuthUser } from "../utils/api";
import { Page } from "../utils/styles";
import mockConversationClass from "../__mocks__/conversations";

export const ConversationPage = () => {
  const { id } = useParams();

  return (
    <Page>
      <ConversationSidebar conversations={[]} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
