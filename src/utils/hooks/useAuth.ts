import { useState, useEffect, useContext } from "react";
import { getAuthUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        // console.log(data);// user console
        updateAuthUser(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
}
