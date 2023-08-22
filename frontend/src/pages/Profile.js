import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "@mui/joy";

import WatchLists from "../components/Profile/WatchLists";
import ProfileInfo from "../components/Profile/ProfileInfo";
import { AuthContext } from "../context/AuthContext";
import { WhiteSpinner } from "../components/Utility/StyledComponents/StyledComponentsUtility";

const Profile = ({ props, personPlaceholder, setOnHomePage, isTabletOrMobile }) => {
  const navigate = useNavigate();
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    setOnHomePage(false);
    if (!props.user && !isLoading) {
      navigate("/");
    }
  }, [props.user, navigate, isLoading, setOnHomePage]);

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

          <WatchLists props={props} userWatchlists={props.watchlists} user={props.user} />
        </>
      ) : (
        <WhiteSpinner />
      )}
    </section>
  );
};

export default Profile;
