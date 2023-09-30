import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import personPlaceholder from "./images/person_cell_placeholder_image.png";

const FinalView = (props) => {
  const {
    TMDBConfig,
    user,
    logout,
    showPopular,
    setShowPopular,
    isLoadingMovieData,
    clearMovData,
    onHomePage,
    setOnHomePage,
    showMov,
    searchTop,
    inputMode,
    handleModeSwitch,
    isTabletOrMobile,
  } = props;
  const TMDBConfigData = TMDBConfig;
  const TMDBImageBaseURL = TMDBConfigData.images?.secure_base_url;

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
            TMDBConfigData && (
              <Home
                props={props}
                showMov={showMov}
                showPopular={showPopular}
                setShowPopular={setShowPopular}
                inputMode={inputMode}
                TMDBConfigData={TMDBConfigData}
                TMDBImageBaseURL={TMDBImageBaseURL}
                personPlaceholder={personPlaceholder}
                setOnHomePage={setOnHomePage}
                isTabletOrMobile={isTabletOrMobile}
              />
            )
          }
        />
        <Route
          path='/profile'
          element={
            <Profile
              props={props}
              user={user}
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
              props={props}
              userWatchlists={props.watchlists}
              user={user}
              setOnHomePage={setOnHomePage}
              setShowPopular={setShowPopular}
              isTabletOrMobile={isTabletOrMobile}
            />
          }
        />
      </Routes>
      <Footer onHomePage={onHomePage} showMov={showMov} isLoadingMovieData={isLoadingMovieData} />
    </div>
  );
};

export default FinalView;
