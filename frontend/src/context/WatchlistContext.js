import { createContext, useMemo, useReducer } from "react";

export const WatchlistContext = createContext();

export const watchlistsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WATCHLISTS":
      return {
        watchlists: action.payload,
      };
    case "POST_WATCHLIST":
      return {
        watchlists: action.payload,
      };
    case "CREATE_WATCHLIST":
      return {
        watchlists: [...state.watchlists, action.payload],
      };
    case "DELETE_WATCHLIST":
      return {
        watchlists: state.watchlists.filter((i) => i._id !== action.payload._id),
      };
    case "PATCH_WATCHLIST":
      return {
        watchlists: state.watchlists.map((item) => (item._id === action.payload._id ? action.payload : item)),
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

export const WatchlistContextProvider = ({ children }) => {
  const [state, dispatchWatchlists] = useReducer(watchlistsReducer, {
    watchlists: null,
    isLoading: true,
  });

  const value = useMemo(() => ({ ...state, dispatchWatchlists }), [state, dispatchWatchlists]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};
