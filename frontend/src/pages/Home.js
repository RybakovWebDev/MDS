import { useEffect } from "react";

import { MainInput } from "../components/Input/MainInput";
import MovieCard from "../components/Movie Data/MovieCard";
import PopularSlideshow from "../components/Movie Data/PopularSlideshow";
import { ErrorMessage } from "../components/Utility/Errors";
import { WhiteSpinner } from "../components/Utility/StyledComponents/StyledComponentsUtility";

const Home = ({
  props,
  TMDBConfigData,
  TMDBImageBaseURL,
  personPlaceholder,
  setOnHomePage,
  inputMode,
  showPopular,
  setShowPopular,
  isTabletOrMobile,
}) => {
  useEffect(() => {
    setOnHomePage(true);
  }, [setOnHomePage]);

  return (
    <section className='home'>
      <MainInput
        personPlaceholder={personPlaceholder}
        TMDBConfigData={TMDBConfigData}
        inputMode={inputMode}
        searchTop={props.searchTop}
        getMovieData={props.getMovieData}
        searchMov={props.searchMov}
        isTabletOrMobile={isTabletOrMobile}
      />

      {props.showMov ? (
        <MovieCard
          props={props}
          TMDBConfigData={TMDBConfigData}
          TMDBImageBaseURL={TMDBImageBaseURL}
          personPlaceholder={personPlaceholder}
          isTabletOrMobile={isTabletOrMobile}
        />
      ) : (
        props.isLoadingMovieData && <WhiteSpinner size={60} sx={{ mt: "10%" }} />
      )}

      {props.movData === "loadErr" && <ErrorMessage noNotification fontSize={"24px"} errorText={props.errMsg} />}

      <div className='popular-slideshow'>
        <PopularSlideshow
          showPopular={showPopular}
          setShowPopular={setShowPopular}
          posters={props.popularTMDB}
          TMDBConfigData={TMDBConfigData}
          TMDBImageBaseURL={TMDBImageBaseURL}
          personPlaceholder={personPlaceholder}
        />
      </div>
    </section>
  );
};

export default Home;
