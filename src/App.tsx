import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPage } from "./pages/ConversationPage";
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="conversations"
          element={
            <AuthenticatedRoute>
              <ConversationPage />
            </AuthenticatedRoute>
          }
        >
          <Route path=":id" element={<ConversationChannelPage />} />
        </Route>
      </Routes>
    </>
  );
}

type Props = {
  children: React.ReactNode;
};

export default App;
