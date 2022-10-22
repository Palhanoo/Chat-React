import styled from "styled-components";
import {
  InputContainerProps,
  MessageItemContentProps,
  PageProps,
} from "./styleTipes";

export const SIDEBAR_WIDTH = 400;
export const InputField = styled.input`
  font-family: "Inter";
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${(prop) => prop.backgroundColor || "#131313"};
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 16px;
  background-color: #2b09ff;
  color: #fff;
  border-radius: 10px;
  padding: 25px 0;
  font-weight: 500;
  transition: 250ms background-color ease;
  &:focus {
    background-color: #3415ff;
    border: 1px solid #ffffff;
  }
  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }
  &:active {
    background-color: #3a1cff;
  }
`;

export const Page = styled.div<PageProps>`
  background-color: #1a1a1a;
  height: 100%;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationSideBarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #1f1f1f;
  border-right: 1px solid #37372e;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /* height: 5px;
    background-color: #000; */
  }
  /* &::-webkit-scrollbar-thumb {
    background-color: #fff;
  } */
`;

export const ConversationSidebarHeader = styled.header`
  position: fixed;
  background-color: #151515;
  width: ${SIDEBAR_WIDTH}px;
  border-bottom: 1px solid #545454;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  /* background-color: #151515; */
  height: 100px;
  & h1 {
    font-weight: 400;
  }
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH}px;
  background-color: #1f1f1f;
`;

export const ConversationSidebarContainer = styled.div`
  margin-top: 100px;
`;

export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #5454543d;
  background-color: #131313;
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000c4;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ModalContainerStyle = styled.div`
  background-color: #111111;
  width: 650px;
  box-sizing: border-box;
  border-radius: 10px;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0 24px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  & h2 {
    font-weight: 500;
    margin: 0;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 24px;
`;

export const TextField = styled.textarea`
  font-family: "Inter";
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessagePanelStyle = styled.div`
  background: inherit;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const MessagePanelBody = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageInputContainer = styled.div`
  box-sizing: border-box;
  background-color: #101010;
  border-radius: 5px;
  width: 100%;
  padding: 32px 16px;
`;

export const MessageInput = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ca1414;
  border-radius: 50%;
`;

export const MessageItemDetails = styled.div``;

export const MessageItemHeader = styled.div`
  display: flex;
  gap: 12px;
  .time {
    color: #6d6d6d;
    font-size: 12px;
    font-weight: bold;
  }

  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  padding: ${({ padding }) => padding};
`;

export const MessagePanelHeaderStyle = styled.header`
  background-color: #151515;
  border-bottom: 1px solid #545454;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
