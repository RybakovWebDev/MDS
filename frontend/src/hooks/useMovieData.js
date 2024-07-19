import { useState } from "react";
import axios from "axios";

import { omdbAPI, tmdbAPI } from "../utilities/constants";

export const useMovieData = ({ setShowMov, setInputMode, setSearchTop, setShowPopular, setErrMsg }) => {
  const [isLoadingMovieData, setIsLoadingMovieData] = useState(false);
  const [movDataOMDB, setMovDataOMDB] = useState("");
  const [movDataTMDB, setMovDataTMDB] = useState("");
  const [TMDBProviders, setTMDBProviders] = useState("");

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

  return {
    searchTMDB,
    isLoadingMovieData,
    movDataOMDB,
    movDataTMDB,
    TMDBProviders,
    getMovieData,
  };
};
