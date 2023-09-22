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

const Profile = ({ props, user, personPlaceholder, setOnHomePage, isTabletOrMobile }) => {
  const { dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();
  const navigate = useNavigate();
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    setOnHomePage(false);
    if (!props.user && !isLoading) {
      navigate("/");
    }
  }, [props.user, navigate, isLoading, setOnHomePage]);

  useEffect(() => {
    if (user) {
      getWatchlists(user.token, user.id, dispatchWatchlists, dispatchUser);
    }
  }, [user, dispatchWatchlists, dispatchUser]);

  return (
    <section className='profile'>
      {isLoading ? (
        <WhiteSpinner sx={{ marginTop: "20vh" }} />
      ) : props.user ? (
        <>
          <ProfileInfo
            isTabletOrMobile={isTabletOrMobile}
            personPlaceholder={personPlaceholder}
            user={props.user}
            userWatchlists={props.watchlists}
          />
          <Divider sx={{ width: "65%", alignSelf: "center", bgcolor: "rgb(65, 65, 65)" }} />

          <Watchlists props={props} userWatchlists={props.watchlists} user={props.user} />
        </>
      ) : (
        <WhiteSpinner />
      )}
    </section>
  );
};

export default Profile;
