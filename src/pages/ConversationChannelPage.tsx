import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../utils/context/AuthContext";
import { ConversationChannelPageStyle } from "../utils/styles";

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  console.log(id);
  return (
    <ConversationChannelPageStyle>
      {user && user.email}
    </ConversationChannelPageStyle>
  );
};
