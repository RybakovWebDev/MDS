import axios from "axios";

export const watchlistsTest = [
  {
    _id: "64a78a331ffde30dc527de15",
    name: "Spider-Mannnnn!!! movies",
    author: "644c00477b17f12be43c26f7",
    titles: [
      {
        imdbID: "tt0145487",
        title: "Spider-Man",
        year: "2002",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0316654",
        title: "Spider-Man 2",
        year: "2004",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMzY2ODk4NmUtOTVmNi00ZTdkLTlmOWYtMmE2OWVhNTU2OTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0413300",
        title: "Spider-Man 3",
        year: "2007",
        poster:
          "https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
      },
      {
        imdbID: "tt2250912",
        title: "Spider-Man: Homecoming",
        year: "2017",
        poster: "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg",
      },
      {
        imdbID: "tt4633694",
        title: "Spider-Man: Into the Spider-Verse",
        year: "2018",
        poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg",
      },
      {
        imdbID: "tt6320628",
        title: "Spider-Man: Far From Home",
        year: "2019",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt9362722",
        title: "Spider-Man: Across the Spider-Verse",
        year: "2023",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      },
    ],
    __v: 0,
  },
  {
    _id: "648a3eb9a95fcdf66079cc27",
    name: "Matrix Trilogy",
    author: "644c00477b17f12be43c26f7",
    titles: [
      {
        imdbID: "tt0133093",
        title: "The Matrix",
        year: "1999",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0234215",
        title: "The Matrix Reloaded",
        year: "2003",
        poster:
          "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0242653",
        title: "The Matrix Revolutions",
        year: "2003",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
      },
    ],
    __v: 0,
  },
  {
    _id: "648f538ba3a6931566791675",
    name: "Watchlist 4",
    author: "644c00477b17f12be43c26f7",
    titles: [
      {
        imdbID: "tt1630029",
        title: "Avatar: The Way of Water",
        year: "2022",
        poster:
          "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
      },
    ],
    __v: 0,
  },
  {
    _id: "64b2444a16190c6d3fdc0f8f",
    name: "Mission Impossible franchise",
    author: "644c00477b17f12be43c26f7",
    titles: [
      {
        imdbID: "tt0117060",
        title: "Mission: Impossible",
        year: "1996",
        poster: "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0120755",
        title: "Mission: Impossible II",
        year: "2000",
        poster:
          "https://m.media-amazon.com/images/M/MV5BN2RkYWVkZDQtNTMxMi00NWQ4LWE2ODctNmQzOWM2NjQzYzdlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0317919",
        title: "Mission: Impossible III",
        year: "2006",
        poster:
          "https://m.media-amazon.com/images/M/MV5BOThhNTA1YjItYzk2Ny00M2Y1LWJlYWUtZDQyZDU0YmY5Y2M5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      },
      {
        imdbID: "tt1229238",
        title: "Mission: Impossible - Ghost Protocol",
        year: "2011",
        poster: "https://m.media-amazon.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt2381249",
        title: "Mission: Impossible - Rogue Nation",
        year: "2015",
        poster:
          "https://m.media-amazon.com/images/M/MV5BOTFmNDA3ZjMtN2Y0MC00NDYyLWFlY2UtNTQ4OTQxMmY1NmVjXkEyXkFqcGdeQXVyNTg4NDQ4NDY@._V1_SX300.jpg",
      },
      {
        imdbID: "tt4912910",
        title: "Mission: Impossible - Fallout",
        year: "2018",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjRlZmM0ODktY2RjNS00ZDdjLWJhZGYtNDljNWZkMGM5MTg0XkEyXkFqcGdeQXVyNjAwMjI5MDk@._V1_SX300.jpg",
      },
      {
        imdbID: "tt9603212",
        title: "Mission: Impossible - Dead Reckoning Part One",
        year: "2023",
        poster:
          "https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmNWEtN2Q3OWFjYjY1NGM2XkEyXkFqcGdeQXVyMTUyMTUzNjQ0._V1_SX300.jpg",
      },
    ],
    __v: 0,
  },
  {
    _id: "648f5b3ca3a6931566791684",
    name: "Watchlist 5",
    author: "644c00477b17f12be43c26f7",
    titles: [
      {
        imdbID: "tt9362722",
        title: "Spider-Man: Across the Spider-Verse",
        year: "2023",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt1630029",
        title: "Avatar: The Way of Water",
        year: "2022",
        poster:
          "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
      },
    ],
    __v: 0,
  },
  {
    _id: "64cbd266e7eaa01f56b2d22a",
    name: "Watchlist 8",
    author: "644c00477b17f12be43c26f7",
    titles: [],
    __v: 0,
  },
  {
    _id: "6508b1ea797f24dd6b21949c",
    name: "Marvel movies and something else so that the title is really long and this is just a test to see what is up here",
    author: "644c00477b17f12be43c26f7",
    titles: [
      {
        imdbID: "tt0371746",
        title: "Iron Man",
        year: "2008",
        poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt1300854",
        title: "Iron Man 3",
        year: "2013",
        poster: "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt1228705",
        title: "Iron Man 2",
        year: "2010",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZGVkNDAyM2EtYzYxYy00ZWUxLTgwMjgtY2VmODE5OTk3N2M5XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0458339",
        title: "Captain America: The First Avenger",
        year: "2011",
        poster: "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0800369",
        title: "Thor",
        year: "2011",
        poster:
          "https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
      },
      {
        imdbID: "tt1981115",
        title: "Thor: The Dark World",
        year: "2013",
        poster: "https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt1843866",
        title: "Captain America: The Winter Soldier",
        year: "2014",
        poster: "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX300.jpg",
      },
      {
        imdbID: "tt2395427",
        title: "Avengers: Age of Ultron",
        year: "2015",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
      },
      {
        imdbID: "tt3498820",
        title: "Captain America: Civil War",
        year: "2016",
        poster: "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0478970",
        title: "Ant-Man",
        year: "2015",
        poster: "https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_SX300.jpg",
      },
      {
        imdbID: "tt3501632",
        title: "Thor: Ragnarok",
        year: "2017",
        poster: "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX300.jpg",
      },
      {
        imdbID: "tt0848228",
        title: "The Avengers",
        year: "2012",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      },
      {
        imdbID: "tt2015381",
        title: "Guardians of the Galaxy",
        year: "2014",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNDIzMTk4NDYtMjg5OS00ZGI0LWJhZDYtMzdmZGY1YWU5ZGNkXkEyXkFqcGdeQXVyMTI5NzUyMTIz._V1_SX300.jpg",
      },
      {
        imdbID: "tt3896198",
        title: "Guardians of the Galaxy Vol. 2",
        year: "2017",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
      },
      {
        imdbID: "tt2250912",
        title: "Spider-Man: Homecoming",
        year: "2017",
        poster: "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg",
      },
      {
        imdbID: "tt6320628",
        title: "Spider-Man: Far From Home",
        year: "2019",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
      },
      {
        imdbID: "tt4154664",
        title: "Captain Marvel",
        year: "2019",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
      },
      {
        imdbID: "tt5889204",
        title: "Pokémon the Movie: Volcanion and the Mechanical Marvel",
        year: "2016",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZTUwZDEzZGEtYTJlYi00OTRkLWJmMzItODU0ZWViMTUyYjUzXkEyXkFqcGdeQXVyNzEyMDQ1MDA@._V1_SX300.jpg",
      },
      {
        imdbID: "tt9669176",
        title: "Accident Man: Hitman's Holiday",
        year: "2022",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTU5MWY3YTEtYmYwNC00MGU1LTk2YWMtOTk0YjgxNDM3NjdjXkEyXkFqcGdeQXVyMjE4NzUxNDA@._V1_SX300.jpg",
      },
    ],
    __v: 0,
  },
];

export const createUser = async (user) => {
  const data = await axios.post(`${process.env.REACT_APP_URI}/api/users`, user);
  return data;
};

export const loginUser = async (user) => {
  const data = await axios.post(`${process.env.REACT_APP_URI}/api/users/login`, user);
  return data;
};

export const getUser = async (userToken, userID) => {
  const data = await axios.get(`${process.env.REACT_APP_URI}/api/users/${userID}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return data;
};

export const updateUser = async (userToken, userID, update, dispatchUser) => {
  try {
    const patchedUser = await axios.patch(`${process.env.REACT_APP_URI}/api/users/${userID}`, update, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const localUser = JSON.parse(localStorage.getItem("user"));
    localUser.name = patchedUser.data.name;
    localUser.image = patchedUser.data.image;
    localStorage.setItem("user", JSON.stringify(localUser));
    dispatchUser({ type: "SET_USER", payload: localUser });
  } catch (err) {
    console.error(err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
    throw err;
  }
};

export const deleteUser = async (userToken, userID, dispatchUser) => {
  try {
    await axios.delete(`${process.env.REACT_APP_URI}/api/users/${userID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatchUser({ type: "LOGOUT_USER" });
  } catch (err) {
    console.error(err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
    throw err;
  }
};

export const getSingleWatchlist = async (watchlistID, dispatchWatchlists) => {
  try {
    const watchlist = await axios.get(`${process.env.REACT_APP_URI}/api/watchlists/single/${watchlistID}`);

    dispatchWatchlists({ type: "SET_LOADING", payload: false });
    return watchlist.data;
  } catch (err) {
    console.error("Error getting watchlists: ", err);
    dispatchWatchlists({ type: "SET_LOADING", payload: false });
    return err;
  }
};

export const getWatchlists = async (userToken, userID, dispatchWatchlists, dispatchUser) => {
  try {
    const watchlists = await axios.get(`${process.env.REACT_APP_URI}/api/watchlists/${userID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    dispatchWatchlists({ type: "SET_WATCHLISTS", payload: watchlists.data });
    dispatchWatchlists({ type: "SET_LOADING", payload: false });
  } catch (err) {
    console.error("Error getting watchlists: ", err);
    dispatchWatchlists({ type: "SET_LOADING", payload: false });
    (err.response.status === 401 || err.response.data.error === "No such user found.") &&
      dispatchUser({ type: "LOGOUT_USER" });
    throw err;
  }
};

export const postWatchlist = async (userToken, userID, dispatchWatchlists, dispatchUser) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URI}/api/watchlists`,
      { id: userID },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    dispatchWatchlists({ type: "CREATE_WATCHLIST", payload: response.data });
    return response.data;
  } catch (err) {
    console.error("Can't create new list: ", err);
    throw err;
  }
};

export const patchWatchlist = async (userToken, listID, update, dispatchWatchlists, dispatchUser) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_URI}/api/watchlists/${listID}`, update, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: response.data });
  } catch (err) {
    console.error("Can't update list: ", err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
    throw err;
  }
};

export const deleteWatchlist = async (userToken, listID, dispatchWatchlists, dispatchUser) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_URI}/api/watchlists/${listID}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    dispatchWatchlists({ type: "DELETE_WATCHLIST", payload: response.data });
  } catch (err) {
    console.error("Can't delete list: ", err);
    err.response.status === 401 && dispatchUser({ type: "LOGOUT_USER" });
    throw err;
  }
};
