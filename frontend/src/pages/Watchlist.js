import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { WhiteSpinner } from "../components/Utility/StyledComponents/StyledComponentsUtility";
import WatchlistSingle from "../components/Watchlists/WatchlistSingle";
import { getSingleWatchlist } from "../services/CrudService";
import { useWatchlistContext } from "../hooks/useWatchlistContext";
import { Typography } from "@mui/material";

const Watchlist = ({ user, userWatchlists, getMovieData, setOnHomePage, setOnWatchlistPage, isTabletOrMobile }) => {
  const [watchlist, setWatchlist] = useState(null);
  const { id } = useParams();
  const { dispatchWatchlists, isLoading: watchlistIsLoading } = useWatchlistContext();
  // TODO use useAuthContext instead of useContext below?
  const { isLoading: userIsLoading } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(false);

  const watchlistID = id;

  useEffect(() => {
    setOnHomePage(false);
    setOnWatchlistPage(true);
  }, [setOnHomePage, setOnWatchlistPage]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const watchlistData = await getSingleWatchlist(watchlistID, dispatchWatchlists);
      if (watchlistData?.response?.status === 500) {
        setErrorMessage("No watchlist found (╯°□°）╯︵ ┻━┻");
      } else {
        dispatchWatchlists({ type: "SET_WATCHLISTS", payload: [watchlistData] });
        setWatchlist(watchlistData);
      }
    };
    fetchWatchlist();
  }, [watchlistID, dispatchWatchlists]);

  return (
    <section className='watchlist-single'>
      {(userIsLoading || watchlistIsLoading) && !watchlist ? (
        <WhiteSpinner sx={{ marginTop: "20vh" }} />
      ) : errorMessage ? (
        <Typography className='fade-in' variant='h3' sx={{ marginTop: "20vh", color: "#fff" }}>
          {errorMessage}
        </Typography>
      ) : (
        <WatchlistSingle
          user={user}
          watchlist={watchlist}
          getMovieData={getMovieData}
          userWatchlists={userWatchlists}
          isTabletOrMobile={isTabletOrMobile}
        />
      )}
    </section>
  );
};

export default Watchlist;
