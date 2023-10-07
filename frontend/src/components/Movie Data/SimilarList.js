import { Link } from "react-router-dom";

import { Typography } from "@mui/joy";

const SimilarList = ({
  getMovieData,
  list,
  TMDBConfigData,
  TMDBImageBaseURL,
  personPlaceholder,
  handleScroll,
  shadowSimilar,
}) => {
  const renderedRecommendations = list
    .filter((i) => i.backdrop_path && i)
    .map((el) => {
      return (
        <li className='movie-similar__item-wrapper' key={el.id}>
          <Link to='/'>
            <div
              className='movie-similar__item'
              onClick={() => {
                getMovieData(el.title, el.id);
              }}
            >
              <img
                src={
                  el.poster_path
                    ? `${TMDBImageBaseURL + TMDBConfigData.images.poster_sizes[0] + el.poster_path}`
                    : personPlaceholder
                }
                alt='Cast or crew member'
                width={92}
                height={138}
                className='movie-similar__image'
              />
              <div className='movie-similar__info'>
                <h3 className='movie-similar__info-title'>{el.title}</h3>
                <h3 className='movie-similar__info-year'>{el.release_date.split("-")[0]}</h3>
              </div>
            </div>
          </Link>
          {list.indexOf(el) !== list.length - 1 ? <div className='movie-similar__separator-hor'></div> : ""}
        </li>
      );
    });

  return (
    <article
      className={`movie-similar ${
        shadowSimilar && list.length !== 0 ? "movie-similar--shadow-on" : "movie-similar--shadow-off"
      }`}
    >
      <div className='movie-similar__wrapper' onScroll={handleScroll}>
        {!list || list.length === 0 ? (
          <Typography mt='47%' level='h4' color='white' textAlign={"center"}>
            No similar titles found
            <br />
            😓
          </Typography>
        ) : (
          <ul className='movie-similar__list'>{renderedRecommendations}</ul>
        )}
      </div>
    </article>
  );
};

export default SimilarList;
