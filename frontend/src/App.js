import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";

import { useAuthContext } from "./hooks/useAuthContext";
import { useAuth } from "./hooks/useAuth";
import { getWatchlists } from "./services/CrudService";
import { useWatchlistContext } from "./hooks/useWatchlistContext";
import { handleScrollShadow } from "./utilities/utilities";

import personPlaceholder from "./images/person_cell_placeholder_image.png";
import { useMovieData } from "./hooks/useMovieData";
import { useInitialData } from "./hooks/useInitialData";

function App() {
  const { user, dispatchUser } = useAuthContext();
  const { logout } = useAuth();
  const { watchlists, dispatchWatchlists } = useWatchlistContext();
  const [onHomePage, setOnHomePage] = useState(true);
  const [onWatchlistPage, setOnWatchlistPage] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [inputMode, setInputMode] = useState("search");
  const [searchTop, setSearchTop] = useState(false);
  const [showMov, setShowMov] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [shadowCast, setShadowCast] = useState("true");
  const [shadowCrew, setShadowCrew] = useState("true");
  const [shadowSimilar, setShadowSimilar] = useState("true");
  const [shadowVideos, setShadowVideos] = useState("true");
  const [movieProvider, setMovieProvider] = useState("");

  const { searchTMDB, isLoadingMovieData, movDataOMDB, movDataTMDB, TMDBProviders, getMovieData } = useMovieData({
    setShowMov,
    setInputMode,
    setSearchTop,
    setShowPopular,
    setErrMsg,
  });
  const { TMDBConfig, popularTMDB } = useInitialData({ setErrMsg });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1279px)" });

  function handleProviderChange(e) {
    setMovieProvider(e.currentTarget.value);
  }

  const handleModeSwitch = () => {
    setInputMode(inputMode === "search" ? "AI" : "search");
  };

  const clearMovData = () => {
    setShowMov(false);
    setInputMode("search");
    setSearchTop(false);
    setShowPopular(true);
  };

  useEffect(() => {
    if (user && !onWatchlistPage) {
      getWatchlists(user.token, user.id, dispatchWatchlists, dispatchUser);
    }
  }, [user, onWatchlistPage, dispatchWatchlists, dispatchUser]);

  return (
    <div className='app'>
      <Header
        onHomePage={onHomePage}
        searchTop={searchTop}
        user={user}
        logout={logout}
        clearMovData={clearMovData}
        inputMode={inputMode}
        handleModeSwitch={handleModeSwitch}
        isLoadingMovieData={isLoadingMovieData}
        isTabletOrMobile={isTabletOrMobile}
      />
      <Routes>
        <Route
          path='/'
          element={
            TMDBConfig && (
              <Home
                user={user}
                watchlists={watchlists}
                movData={movDataOMDB}
                movDataTMDB={movDataTMDB}
                popularTMDB={popularTMDB}
                TMDBProviders={TMDBProviders}
                movieProvider={movieProvider}
                handleProviderChange={handleProviderChange}
                showMov={showMov}
                showPopular={showPopular}
                setShowPopular={setShowPopular}
                inputMode={inputMode}
                TMDBConfigData={TMDBConfig}
                TMDBImageBaseURL={TMDBConfig.images?.secure_base_url}
                personPlaceholder={personPlaceholder}
                setOnHomePage={setOnHomePage}
                searchTop={searchTop}
                getMovieData={getMovieData}
                searchMov={searchTMDB}
                isLoadingMovieData={isLoadingMovieData}
                errMsg={errMsg}
                handleScroll={(e) =>
                  handleScrollShadow(e, setShadowCast, setShadowCrew, setShadowSimilar, setShadowVideos)
                }
                shadowCast={shadowCast}
                shadowCrew={shadowCrew}
                shadowVideos={shadowVideos}
                shadowSimilar={shadowSimilar}
                isTabletOrMobile={isTabletOrMobile}
              />
            )
          }
        />
        <Route
          path='/profile'
          element={
            <Profile
              user={user}
              watchlists={watchlists}
              getMovieData={getMovieData}
              personPlaceholder={personPlaceholder}
              setOnHomePage={setOnHomePage}
              isTabletOrMobile={isTabletOrMobile}
            />
          }
        />
        <Route
          path='/watchlist/:id'
          element={
            <Watchlist
              userWatchlists={watchlists}
              user={user}
              getMovieData={getMovieData}
              setOnHomePage={setOnHomePage}
              setOnWatchlistPage={setOnWatchlistPage}
              setShowPopular={setShowPopular}
              isTabletOrMobile={isTabletOrMobile}
            />
          }
        />
      </Routes>
      <Footer onHomePage={onHomePage} showMov={showMov} isLoadingMovieData={isLoadingMovieData} />
    </div>
  );
}

export default App;
