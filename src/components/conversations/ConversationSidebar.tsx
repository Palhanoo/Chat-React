import { FC, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSideBarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { ConversationType } from "../../utils/types";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { CreateConversationModal } from "../../modals/CreateConversationModal";
import { AuthContext } from "../../utils/context/AuthContext";
import { RootState } from "../../store";

type Props = {
  conversations: ConversationType[];
};

export const ConversationSidebar: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const getDisplayUser = (conversation: ConversationType) => {
    const userId = user?.id;
    return conversation.creator.id === userId
      ? conversation.recipient
      : conversation.creator;
  };
  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <ConversationSideBarStyle>
        <ConversationSidebarHeader>
          <h1>Conversations</h1>
          <div
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            <TbEdit size={40} />
          </div>
        </ConversationSidebarHeader>
        <ConversationSidebarContainer>
          {Array.from(conversations, ([_, conversation]) => conversation).map(
            (conversation) => (
              <ConversationSidebarItem
                key={conversation.id}
                onClick={() => navigate(`/conversations/${conversation.id}`)}
              >
                <div className={styles.conversationAvatar}></div>
                <div>
                  <span className={styles.conversationName}>
                    {`${getDisplayUser(conversation).firstName} 
                    ${getDisplayUser(conversation).lastName}`}
                  </span>
                  <span className={styles.conversationLastMessage}>
                    Sample Text
                  </span>
                </div>
              </ConversationSidebarItem>
            )
          )}
        </ConversationSidebarContainer>
      </ConversationSideBarStyle>
    </>
  );
};
