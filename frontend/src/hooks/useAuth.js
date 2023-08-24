import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "./useAuthContext";
import { loginUser, createUser } from "../services/CrudService";

export const useAuth = () => {
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchUser } = useAuthContext();
  const navigate = useNavigate();

  const auth = async (email, password, isLogin) => {
    setIsLoading(true);
    setAuthError(null);

    const user = { email: email.toLowerCase(), password: password.trim() };

    try {
      const json = isLogin ? await loginUser(user) : await createUser(user);
      localStorage.setItem("user", JSON.stringify(json.data));

      dispatchUser({ type: "LOGIN_USER", payload: json.data });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setAuthError(err.response ? err.response.data.error : err.message);
    }
  };

  const logout = () => {
    dispatchUser({ type: "LOGOUT_USER" });
    navigate("/");
  };

  const clearError = () => {
    setAuthError(null);
  };

  return { auth, isLoading, authError, clearError, logout };
};
