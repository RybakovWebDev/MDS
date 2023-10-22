import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "@mui/joy";

import Watchlists from "../components/Watchlists/Watchlists";
import ProfileInfo from "../components/Profile/ProfileInfo";
import { AuthContext } from "../context/AuthContext";
import { WhiteSpinner } from "../components/Utility/StyledComponents/StyledComponentsUtility";
import { useWatchlistContext } from "../hooks/useWatchlistContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { getWatchlists } from "../services/CrudService";

const Profile = ({ user, watchlists, getMovieData, personPlaceholder, setOnHomePage, isTabletOrMobile }) => {
  const { dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();
  const { isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setOnHomePage(false);
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, navigate, isLoading, setOnHomePage]);

  useEffect(() => {
    if (user) {
      getWatchlists(user.token, user.id, dispatchWatchlists, dispatchUser);
    }
  }, [user, dispatchWatchlists, dispatchUser]);

  return (
    <section className='profile'>
      {isLoading ? (
        <WhiteSpinner sx={{ marginTop: "20vh" }} />
      ) : user ? (
        <>
          <ProfileInfo
            user={user}
            userWatchlists={watchlists}
            personPlaceholder={personPlaceholder}
            isTabletOrMobile={isTabletOrMobile}
          />
          <Divider sx={{ width: "65%", alignSelf: "center", bgcolor: "rgb(65, 65, 65)" }} />

          <Watchlists
            user={user}
            userWatchlists={watchlists}
            getMovieData={getMovieData}
            isTabletOrMobile={isTabletOrMobile}
          />
        </>
      ) : (
        <WhiteSpinner />
      )}
    </section>
  );
};

export default Profile;
