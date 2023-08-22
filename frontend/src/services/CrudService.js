import axios from "axios";

export const createUser = async (user) => {
  const data = await axios.post(`${process.env.REACT_APP_URI}/api/users`, user);
  return data;
};

export const loginUser = async (user) => {
  const data = await axios.post(`${process.env.REACT_APP_URI}/api/users/login`, user);
  return data;
};

export const updateUser = async (userToken, userID, update, dispatchUser) => {
  try {
    const patchedUser = await axios.patch(`${process.env.REACT_APP_URI}/api/users/${userID}`, update, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log(patchedUser.data);
    const localUser = JSON.parse(localStorage.getItem("user"));
    localUser.name = patchedUser.data.name;
    localUser.image = patchedUser.data.image;
    localStorage.setItem("user", JSON.stringify(localUser));
    dispatchUser({ type: "SET_USER", payload: localUser });
  } catch (err) {
    console.error(err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
  }
};

export const deleteUser = async (userToken, userID, dispatchUser) => {
  try {
    await axios.delete(`${process.env.REACT_APP_URI}/api/users/${userID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatchUser({ type: "LOGOUT_USER" });
  } catch (err) {
    console.error(err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
  }
};

export const postWatchlist = async (userToken, userID, dispatchWatchlists, dispatchUser) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URI}/api/watchlists`,
      { id: userID },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatchWatchlists({ type: "CREATE_WATCHLIST", payload: response.data });
    return response.data;
  } catch (err) {
    console.log("Can't delete user: ", err);
  }
};

export const getWatchlists = async (userToken, userID, dispatchWatchlists, dispatchUser) => {
  console.log("This is the userToken: ", userToken);
  try {
    const watchlists = await axios.get(`${process.env.REACT_APP_URI}/api/watchlists/${userID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log(watchlists);
    dispatchWatchlists({ type: "SET_WATCHLISTS", payload: watchlists.data });
    dispatchWatchlists({ type: "SET_LOADING", payload: false });
  } catch (err) {
    console.log("Error getting watchlists: ", err);
    dispatchWatchlists({ type: "SET_LOADING", payload: false });
    (err.response.status === 401 || err.response.data.error === "No such user found.") &&
      dispatchUser({ type: "LOGOUT_USER" });
  }
};

export const patchWatchlist = async (userToken, listID, update, dispatchWatchlists, dispatchUser) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_URI}/api/watchlists/${listID}`, update, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: response.data });
  } catch (err) {
    console.log("Can't patch list: ", err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
  }
};

export const deleteWatchlist = async (userToken, listID, dispatchWatchlists, dispatchUser) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_URI}/api/watchlists/${listID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatchWatchlists({ type: "DELETE_WATCHLIST", payload: response.data });
  } catch (err) {
    console.log("Can't delete list: ", err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
  }
};
