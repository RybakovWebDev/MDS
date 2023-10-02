import React, { useEffect, useState } from "react";
import axios from "axios";

import FinalView from "./FinalView";
import { useAuthContext } from "./hooks/useAuthContext";
import { useWatchlistContext } from "./hooks/useWatchlistContext";
import { getWatchlists } from "./services/CrudService";
import { handleScrollShadow } from "./utilities/utilities";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "./hooks/useAuth";

const omdbAPI = process.env.REACT_APP_OMDB_API;
const tmdbAPI = process.env.REACT_APP_TMDB_API;

function App() {
  const { user, dispatchUser } = useAuthContext();
  const { logout } = useAuth();
  const { watchlists, dispatchWatchlists } = useWatchlistContext();
  const [onHomePage, setOnHomePage] = useState(true);
  const [onWatchlistPage, setOnWatchlistPage] = useState(false);
  const [popularTMDB, setPopularTMDB] = useState("");
  const [showPopular, setShowPopular] = useState(false);
  const [inputMode, setInputMode] = useState("search");
  const [searchTop, setSearchTop] = useState(false);
  const [showMov, setShowMov] = useState(false);
  const [isLoadingMovieData, setIsLoadingMovieData] = useState(false);
  const [movDataOMDB, setMovDataOMDB] = useState("");
  const [movDataTMDB, setMovDataTMDB] = useState("");
  const [TMDBConfig, setTMDBConfig] = useState("");
  const [TMDBProviders, setTMDBProviders] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [shadowCast, setShadowCast] = useState("true");
  const [shadowCrew, setShadowCrew] = useState("true");
  const [shadowSimilar, setShadowSimilar] = useState("true");
  const [shadowVideos, setShadowVideos] = useState("true");
  const [movieProvider, setMovieProvider] = useState("");

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
    const getTMDBConfig = async () => {
      try {
        const resTMDBConfig = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${tmdbAPI}`);
        setTMDBConfig(resTMDBConfig.data);
      } catch (err) {
        console.error(err);
        console.error(err?.response?.status);
        setMovDataOMDB("loadErr");
      } finally {
      }
    };
    getTMDBConfig();
  }, []);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const resTMDBPopular = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPI}&language=en-US&page=1`
        );
        setPopularTMDB(resTMDBPopular.data.results);
      } catch (err) {
        console.error("Error getting popular movies.", err);
      }
    };
    getPopularMovies();
  }, []);

  const searchTMDB = async (movName) => {
    const reqTMDB = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPI}&language=en-US&query=${movName}&page=1&include_adult=false`;

    try {
      const responseTMDB = await axios.get(reqTMDB);
      return responseTMDB;
    } catch (err) {
      console.error(err);
    }
  };

  const getExternalIDs = async (resTMDBid) => {
    try {
      const resExternalIds = await axios.get(
        `https://api.themoviedb.org/3/movie/${resTMDBid}/external_ids?api_key=${tmdbAPI}`
      );
      if (resExternalIds.data.imdb_id || resExternalIds.data.id) {
        return resExternalIds.data;
      }
      console.log(resExternalIds);
      return null;
    } catch (err) {
      console.error(err);
    }
  };

  const getOMDBData = async (titleIDs) => {
    try {
      if (!titleIDs.imdb_id) console.error("No IMDB ID found");

      const resOMDB = await axios.get(`https://www.omdbapi.com/?i=${titleIDs.imdb_id}&apikey=${omdbAPI}`);

      return resOMDB;
    } catch (err) {
      console.error(err);
    }
  };

  const getTMDBData = async (resTMDBid, titleIDs) => {
    try {
      const resTMDBDetail = await axios.get(
        `https://api.themoviedb.org/3/movie/${titleIDs.id}?api_key=${tmdbAPI}&append_to_response=credits,recommendations,images,videos, external_ids`
      );
      const resTMDBDProviders = await axios.get(
        `https://api.themoviedb.org/3/movie/${resTMDBid}/watch/providers?api_key=${tmdbAPI}`
      );
      return { resTMDBDetail, resTMDBDProviders };
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieData = async (movName, resTMDBid) => {
    setShowMov(false);
    setInputMode("search");
    setIsLoadingMovieData(true);
    setSearchTop(true);

    try {
      const resTMDB = await searchTMDB(movName);
      if (resTMDB.data.results.length === 0 && !resTMDBid) throw new Error("No movies found");
      const TMDBid = resTMDBid ? resTMDBid : resTMDB.data.results[0].id;

      const titleIDs = await getExternalIDs(TMDBid);

      const { resTMDBDetail, resTMDBDProviders } = await getTMDBData(TMDBid, titleIDs);

      setMovDataTMDB(resTMDBDetail.data);
      setTMDBProviders(Object.keys(resTMDBDProviders.data.results).length === 0 ? false : resTMDBDProviders.data);

      const resOMDB = await getOMDBData(titleIDs);
      if (resOMDB.data.Response === "False" && resTMDB.data.results.length === 0 && !resTMDBid)
        throw new Error("No movies found");
      setMovDataOMDB(resOMDB?.data);

      setTimeout(() => {
        setShowPopular(false);
        setShowMov(true);
        setIsLoadingMovieData(false);
      }, 300);
    } catch (err) {
      setShowPopular(false);
      setMovDataOMDB("loadErr");
      setErrMsg(
        err.message === "No movies found"
          ? "No movies found. Try again?"
          : "Something went wrong 😔 — could not load movie data."
      );
      setIsLoadingMovieData(false);
    }
  };

  useEffect(() => {
    if (user && !onWatchlistPage) {
      getWatchlists(user.token, user.id, dispatchWatchlists, dispatchUser);
    }
  }, [user, dispatchWatchlists, dispatchUser]);

  return (
    <FinalView
      onHomePage={onHomePage}
      setOnHomePage={setOnHomePage}
      setOnWatchlistPage={setOnWatchlistPage}
      user={user}
      logout={logout}
      watchlists={watchlists}
      inputMode={inputMode}
      handleModeSwitch={handleModeSwitch}
      showPopular={showPopular}
      setShowPopular={setShowPopular}
      popularTMDB={popularTMDB}
      searchTop={searchTop}
      showMov={showMov}
      clearMovData={clearMovData}
      searchMov={searchTMDB}
      movData={movDataOMDB}
      movDataTMDB={movDataTMDB}
      TMDBProviders={TMDBProviders}
      TMDBConfig={TMDBConfig}
      getMovieData={getMovieData}
      isLoadingMovieData={isLoadingMovieData}
      handleScroll={(e) => handleScrollShadow(e, setShadowCast, setShadowCrew, setShadowSimilar, setShadowVideos)}
      shadowCast={shadowCast}
      shadowCrew={shadowCrew}
      shadowSimilar={shadowSimilar}
      shadowVideos={shadowVideos}
      handleProviderChange={handleProviderChange}
      movieProvider={movieProvider}
      errMsg={errMsg}
      isTabletOrMobile={isTabletOrMobile}
    />
  );
}

export default App;
