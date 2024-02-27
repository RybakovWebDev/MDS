import { useEffect, useState } from "react";
import axios from "axios";

import { tmdbAPI } from "../utilities/constants";

export const useInitialData = ({ setErrMsg }) => {
  const [TMDBConfig, setTMDBConfig] = useState("");
  const [popularTMDB, setPopularTMDB] = useState("");

  useEffect(() => {
    const getTMDBConfig = async () => {
      try {
        const resTMDBConfig = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${tmdbAPI}`);
        setTMDBConfig(resTMDBConfig.data);
      } catch (err) {
        console.error(err);
        console.error(err?.response?.status);
        setTMDBConfig("loadErr");
        setErrMsg("Server error 😥 Please try again later.");
      } finally {
      }
    };
    getTMDBConfig();
  }, [setErrMsg]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const resTMDBPopular = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPI}&language=en-US&page=1`
        );
        setPopularTMDB(resTMDBPopular.data.results);
      } catch (err) {
        console.error("Error getting popular movies.", err);
        setPopularTMDB("loadErr");
      }
    };
    getPopularMovies();
  }, []);

  return {
    TMDBConfig,
    popularTMDB,
  };
};
