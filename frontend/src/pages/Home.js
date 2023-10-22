import { useEffect } from "react";

import HomeInput from "../components/Input/HomeInput";
import MovieCard from "../components/Movie Data/MovieCard";
import PopularSlideshow from "../components/Movie Data/PopularSlideshow";
import { ErrorMessage } from "../components/Utility/Errors";
import { WhiteSpinner } from "../components/Utility/StyledComponents/StyledComponentsUtility";

const Home = ({
  user,
  watchlists,
  movData,
  movDataTMDB,
  TMDBProviders,
  movieProvider,
  handleProviderChange,
  showMov,
  popularTMDB,
  TMDBConfigData,
  TMDBImageBaseURL,
  personPlaceholder,
  setOnHomePage,
  inputMode,
  showPopular,
  setShowPopular,
  searchTop,
  getMovieData,
  searchMov,
  isLoadingMovieData,
  errMsg,
  handleScroll,
  shadowCast,
  shadowCrew,
  shadowVideos,
  shadowSimilar,
  isTabletOrMobile,
}) => {
  useEffect(() => {
    setOnHomePage(true);
  }, [setOnHomePage, setShowPopular]);

  return (
    <section className={`home${!showMov && isTabletOrMobile ? " topMargin6rem" : ""}`}>
      {TMDBConfigData === "loadErr" ? (
        <ErrorMessage noNotification fontSize={"24px"} errorText={errMsg} />
      ) : (
        <HomeInput
          personPlaceholder={personPlaceholder}
          TMDBConfigData={TMDBConfigData}
          inputMode={inputMode}
          searchTop={searchTop}
          getMovieData={getMovieData}
          searchMov={searchMov}
          isTabletOrMobile={isTabletOrMobile}
        />
      )}

      {showMov ? (
        <MovieCard
          user={user}
          watchlists={watchlists}
          getMovieData={getMovieData}
          movData={movData}
          movDataTMDB={movDataTMDB}
          TMDBProviders={TMDBProviders}
          movieProvider={movieProvider}
          handleProviderChange={handleProviderChange}
          isLoadingMovieData={isLoadingMovieData}
          TMDBConfigData={TMDBConfigData}
          TMDBImageBaseURL={TMDBImageBaseURL}
          personPlaceholder={personPlaceholder}
          handleScroll={handleScroll}
          shadowCast={shadowCast}
          shadowCrew={shadowCrew}
          shadowVideos={shadowVideos}
          shadowSimilar={shadowSimilar}
          isTabletOrMobile={isTabletOrMobile}
        />
      ) : (
        isLoadingMovieData && <WhiteSpinner size={60} sx={{ mt: "10%" }} />
      )}

      <div className='popular-slideshow'>
        <PopularSlideshow
          showMov={showMov}
          showPopular={showPopular}
          setShowPopular={setShowPopular}
          posters={popularTMDB}
          TMDBConfigData={TMDBConfigData}
          TMDBImageBaseURL={TMDBImageBaseURL}
          personPlaceholder={personPlaceholder}
        />
      </div>
    </section>
  );
};

export default Home;
