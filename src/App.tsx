import React, { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPage } from "./pages/ConversationPage";
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { getAuthUser } from "./utils/api";
import { User } from "./utils/types";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="conversations"
          element={
            <RequireAuth>
              <ConversationPage />
            </RequireAuth>
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

const RequireAuth: FC<Props> = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div>loading...</div>;
  } else {
    if (user) return <>{children}</>;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default App;
