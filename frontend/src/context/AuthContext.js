import { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import { getUser } from "../services/CrudService";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT_USER":
      localStorage.removeItem("user");
      return {
        user: null,
      };
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatchUser] = useReducer(authReducer, {
    user: null,
    isLoading: true,
  });
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const verify = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_URI}/api/users/verify`,
          {},
          { headers: { Authorization: `Bearer ${localUser.token}` } }
        );
        dispatchUser({ type: "LOGIN_USER", payload: localUser });
        dispatchUser({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatchUser({ type: "LOGOUT_USER" });
        dispatchUser({ type: "SET_LOADING", payload: false });
      }
    };

    if (localUser) {
      verify();
      getUser(localUser.token, localUser.id).then((userData) => {
        const latestUserData = { ...localUser, name: userData.data.name, image: userData.data.image };
        localStorage.setItem("user", JSON.stringify(latestUserData));
        dispatchUser({ type: "SET_USER", payload: latestUserData });
      });
    } else {
      dispatchUser({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatchUser }}>{children}</AuthContext.Provider>;
};
