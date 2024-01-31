/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { api } from "../services/api";
import { useHref, useNavigate } from "react-router-dom";

export const authContext = createContext({});

export function AuthContextProvider(props) {
  const href = useHref();
  const navigate = useNavigate();

  async function handleLoginUser(login, password) {
    try {
      localStorage.removeItem("token");
      const { data } = await api.post("/auth/login", { login, password });
      const { token } = data;

      localStorage.setItem("token", token);
      navigate("/carousel");
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (!localStorageToken && href !== "/") {
      navigate("/");
    }
  }, [href]);

  return (
    <authContext.Provider
      value={{
        handleLoginUser,
        handleLogout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
