import CastCells from "./CastCells";
import CrewCells from "./CrewCells";
import Media from "./Media";
import Providers from "./Providers";
import SimilarList from "./SimilarList";
import AddToWatchlist from "./AddToWatchlist";
import { formatMoney } from "../../utilities/utilities";
import { StyledBoxSimilarProviders } from "../Utility/StyledComponents/StyledComponentsMovieData";

const MovieCard = ({
  user,
  watchlists,
  getMovieData,
  movData,
  movDataTMDB,
  movieProvider,
  handleProviderChange,
  isLoadingMovieData,
  personPlaceholder,
  TMDBConfigData,
  TMDBImageBaseURL,
  TMDBProviders,
  handleScroll,
  shadowCast,
  shadowCrew,
  shadowVideos,
  shadowSimilar,
  isTabletOrMobile,
}) => {
  const renderNamesList = (list) => {
    const namesArr = Array.isArray(list) ? list : list.split(", ");
    const renderedList = namesArr.map((el, i) => {
      return (
        <a
          className='movie-data__names-link-text'
          key={i}
          href={`https://www.google.com/search?q=${el}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {el}
          {namesArr.indexOf(el) === namesArr.length - 1 ? "" : ", "}
        </a>
      );
    });
    return renderedList;
  };

  return (
    <article className={`movie-card ${isLoadingMovieData ? "hidden" : "fade-in"}`}>
      <div className='movie-card__top'>
        <div className={`movie-card__poster`}>
          <img
            src={
              movData?.Poster ||
              `${TMDBImageBaseURL + TMDBConfigData.images.poster_sizes[4] + movDataTMDB?.images?.posters[0].file_path}`
            }
            alt='Movie poster'
          />
        </div>

        {/* //////// NAME, YEAR, LENGTH //////// */}
        <div className={`movie-data`}>
          <div className='movie-data__head'>
            <h1 className='movie-data__head-name'>{movData?.Title || movDataTMDB?.title}</h1>
            <div className='movie-data__head-info'>
              <h2 className='movie-data__head-info-field'>{movData?.Year || movDataTMDB?.release_date.slice(0, 4)}</h2>
              <div className='movie-data__head-info-separator' />
              <h2 className='movie-data__head-info-field'>{movData?.Runtime || `${movDataTMDB?.runtime} min`}</h2>
            </div>
            <h3 className='movie-data__head-genres'>
              {movData?.Genre || movDataTMDB.genres.map((genre) => genre.name).join(", ")}
            </h3>
          </div>

          <div className='movie-data__separator-hor'></div>

          {/* //////// DIRECTOR, WRITER, TOP CAST //////// */}
          <div className='movie-data__names'>
            <table>
              <tbody>
                <tr>
                  <td className='movie-data__names-category'>Director:</td>
                  <td>
                    {renderNamesList(
                      movData?.Director ||
                        movDataTMDB?.credits.crew.filter((p) => p.job === "Director").map((p) => p.name)
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='movie-data__names-category'>Writer:</td>
                  <td>
                    {renderNamesList(
                      movData?.Writer || movDataTMDB?.credits.crew.filter((p) => p.job === "Writer").map((p) => p.name)
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='movie-data__names-category'>Stars:</td>
                  <td>{renderNamesList(movData?.Actors || movDataTMDB?.credits.cast.map((p) => p.name))}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* //////// PLOT //////// */}
          <p className='movie-data__plot'>{movData?.Plot || movDataTMDB?.overview}</p>

          {/* //////// RATINGS //////// */}
          {movData.Ratings && movData?.Ratings.length !== 0 && (
            <>
              <div className='movie-data__separator-hor'></div>
              <div className='movie-data__ratings'>
                <table>
                  <tbody>
                    <tr>
                      {movData?.Ratings.map((el, i) => {
                        return (
                          <td key={i}>
                            <h3 className='movie-data__ratings-website'>{el?.Source}</h3>
                            <h3 className='movie-data__ratings-score'>{el?.Value}</h3>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className='movie-data__separator-hor'></div>

          {/* //////// MONEY //////// */}
          <div className='movie-data__money-watchlist'>
            <div className='movie-data__money'>
              <table>
                <tbody>
                  <tr>
                    <td className='movie-data__money-category'>Budget:</td>
                    <td className='movie-data__money-number'>
                      {movDataTMDB?.budget !== 0 || movDataTMDB?.budget ? formatMoney(movDataTMDB?.budget) : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className='movie-data__money-category'>Revenue:</td>
                    <td className='movie-data__money-number'>
                      {movDataTMDB?.revenue !== 0 || movDataTMDB?.revenue ? formatMoney(movDataTMDB?.revenue) : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {user && (
              <AddToWatchlist
                user={user}
                userWatchlists={watchlists}
                titleDataTMDB={movDataTMDB}
                titlePosterOMDB={movData?.Poster}
              />
            )}
          </div>
        </div>
      </div>

      <div className='movie-card__bottom'>
        <h2 className='movie-card__bottom-section-name'>Cast</h2>
        <article
          className={`movie-cast ${
            shadowCast && movDataTMDB?.credits.cast.length > 5 ? "movie-cast--shadow-on" : "movie-cast--shadow-off"
          }`}
        >
          <div className='movie-cast__cells-row' onScroll={handleScroll}>
            <CastCells
              list={movDataTMDB?.credits.cast}
              TMDBConfigData={TMDBConfigData}
              TMDBImageBaseURL={TMDBImageBaseURL}
              personPlaceholder={personPlaceholder}
            />
          </div>
        </article>

        <h2 className='movie-card__bottom-section-name'>Full Crew</h2>
        <article
          className={`movie-crew ${
            shadowCrew && movDataTMDB?.credits.crew.length > 8 ? "movie-crew--shadow-on" : "movie-crew--shadow-off"
          }`}
        >

            <CrewCells
              list={movDataTMDB?.credits.crew}
              TMDBConfigData={TMDBConfigData}
              TMDBImageBaseURL={TMDBImageBaseURL}
              personPlaceholder={personPlaceholder}
              handleScroll={handleScroll}
            />

        </article>

        {movDataTMDB.images.posters.length === 0 && movDataTMDB.videos.results.length === 0 ? (
          ""
        ) : (
          <>
            <h2 className='movie-card__bottom-section-name'>Related Media</h2>
            <Media
              shadowVideos={shadowVideos}
              handleScroll={handleScroll}
              movDataTMDB={movDataTMDB}
              TMDBConfigData={TMDBConfigData}
            />
          </>
        )}

        {!isTabletOrMobile && (
          <div className='movie-card__bottom-section-name-wrapper'>
            <h2 className='movie-card__bottom-section-name'>Similar Titles</h2>
            <h2 className='movie-card__bottom-section-name'>Streaming services</h2>
          </div>
        )}

        <StyledBoxSimilarProviders>
          {isTabletOrMobile && <h2 className='movie-card__bottom-section-name'>Similar Titles</h2>}
          <SimilarList
            getMovieData={getMovieData}
            list={movDataTMDB?.recommendations?.results}
            TMDBConfigData={TMDBConfigData}
            TMDBImageBaseURL={TMDBImageBaseURL}
            personPlaceholder={personPlaceholder}
            handleScroll={handleScroll}
            shadowSimilar={shadowSimilar}
          />
          {isTabletOrMobile && <h2 className='movie-card__bottom-section-name'>Streaming services</h2>}
          <Providers
            movData={movData}
            providers={TMDBProviders}
            movieProvider={movieProvider}
            handleProviderChange={handleProviderChange}
            TMDBConfigData={TMDBConfigData}
            TMDBImageBaseURL={TMDBImageBaseURL}
          />
        </StyledBoxSimilarProviders>
      </div>
    </article>
  );
};

export default MovieCard;
