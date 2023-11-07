import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw Error("useWatchlistContext must be used inside an WatchlistContextProvider");
  }

  return context;
};
