import { useParams } from "react-router-dom";
import { ConversationChannelPageStyle } from "../utils/styles";

export const ConversationChannelPage = () => {

    console.log(useParams())
  return (
    <ConversationChannelPageStyle>
      ChannelPage
    </ConversationChannelPageStyle>
  );
};
