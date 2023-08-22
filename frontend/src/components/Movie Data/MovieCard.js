import CastCells from "./CastCells";
import CrewCells from "./CrewCells";
import Media from "./Media";
import Providers from "./Providers";
import SimilarList from "./SimilarList";
import AddToWatchlist from "./AddToWatchlist";
import { formatMoney } from "../../utilities/utilities";
import { StyledBoxSimilarProviders } from "../Utility/StyledComponents/StyledComponentsMovieData";

const MovieCard = ({ props, personPlaceholder, TMDBConfigData, TMDBImageBaseURL, isTabletOrMobile }) => {
  const renderNamesList = (list) => {
    const namesArr = list.split(", ");
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
    <article className={`movie-card ${props.isLoadingMovieData ? "hidden" : "fade-in"}`}>
      <div className='movie-card__top'>
        <div className={`movie-card__poster`}>
          <img src={props.movData?.Poster} alt='Movie poster' />
        </div>

        {/* //////// NAME, YEAR, LENGTH //////// */}
        <div className={`movie-data`}>
          <div className='movie-data__head'>
            <h1 className='movie-data__head-name'>{props.movData?.Title}</h1>
            <div className='movie-data__head-info'>
              <h2 className='movie-data__head-info-field'>{props.movData?.Year}</h2>
              <div className='movie-data__head-info-separator' />
              <h2 className='movie-data__head-info-field'>{props.movData?.Runtime}</h2>
            </div>
            <h3 className='movie-data__head-genres'>{props.movData?.Genre}</h3>
          </div>

          <div className='movie-data__separator-hor'></div>

          {/* //////// DIRECTOR, WRITER, TOP CAST //////// */}
          <div className='movie-data__names'>
            <table>
              <tbody>
                <tr>
                  <td className='movie-data__names-category'>Director:</td>
                  <td>{renderNamesList(props.movData?.Director)}</td>
                </tr>
                <tr>
                  <td className='movie-data__names-category'>Writer:</td>
                  <td>{renderNamesList(props.movData?.Writer)}</td>
                </tr>
                <tr>
                  <td className='movie-data__names-category'>Stars:</td>
                  <td>{renderNamesList(props.movData?.Actors)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* //////// PLOT //////// */}
          <p className='movie-data__plot'>{props.movData?.Plot}</p>

          {/* //////// RATINGS //////// */}
          {props.movData?.Ratings.length !== 0 ? (
            <>
              <div className='movie-data__separator-hor'></div>
              <div className='movie-data__ratings'>
                <table>
                  <tbody>
                    <tr>
                      {props.movData?.Ratings.map((el, i) => {
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
          ) : (
            ""
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
                      {props.movDataTMDB?.budget !== 0 || props.movDataTMDB?.budget
                        ? formatMoney(props.movDataTMDB?.budget)
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className='movie-data__money-category'>Revenue:</td>
                    <td className='movie-data__money-number'>
                      {props.movDataTMDB?.revenue !== 0 || props.movDataTMDB?.revenue
                        ? formatMoney(props.movDataTMDB?.revenue)
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {props.user && (
              <AddToWatchlist
                userID={props.user?.id}
                userWatchlists={props.watchlists}
                titleDataTMDB={props.movDataTMDB}
                titlePosterOMDB={props.movData?.Poster}
              />
            )}
          </div>
        </div>
      </div>

      <div className='movie-card__bottom'>
        <h2 className='movie-card__bottom-section-name'>Cast</h2>
        <article
          className={`movie-cast ${
            props.shadowCast && props.movDataTMDB?.credits.cast.length > 5
              ? "movie-cast--shadow-on"
              : "movie-cast--shadow-off"
          }`}
        >
          <div className='movie-cast__cells-row' onScroll={props.handleScroll}>
            <CastCells
              list={props.movDataTMDB?.credits.cast}
              TMDBConfigData={TMDBConfigData}
              TMDBImageBaseURL={TMDBImageBaseURL}
              personPlaceholder={personPlaceholder}
            />
          </div>
        </article>

        <h2 className='movie-card__bottom-section-name'>Full Crew</h2>
        <article
          className={`movie-crew ${
            props.shadowCrew && props.movDataTMDB?.credits.crew.length > 8
              ? "movie-crew--shadow-on"
              : "movie-crew--shadow-off"
          }`}
        >
          <div className='movie-crew__wrapper' onScroll={props.handleScroll}>
            <CrewCells
              list={props.movDataTMDB?.credits.crew}
              TMDBConfigData={TMDBConfigData}
              TMDBImageBaseURL={TMDBImageBaseURL}
              personPlaceholder={personPlaceholder}
            />
          </div>
        </article>

        {props.movDataTMDB.images.posters.length === 0 && props.movDataTMDB.videos.results.length === 0 ? (
          ""
        ) : (
          <>
            <h2 className='movie-card__bottom-section-name'>Related Media</h2>
            <Media
              shadowVideos={props.shadowVideos}
              handleScroll={props.handleScroll}
              movDataTMDB={props.movDataTMDB}
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
            props={props}
            list={props.movDataTMDB?.recommendations?.results}
            TMDBConfigData={TMDBConfigData}
            TMDBImageBaseURL={TMDBImageBaseURL}
            personPlaceholder={personPlaceholder}
          />
          {isTabletOrMobile && <h2 className='movie-card__bottom-section-name'>Streaming services</h2>}
          <Providers
            props={props}
            list={props.TMDBProviders}
            TMDBConfigData={TMDBConfigData}
            TMDBImageBaseURL={TMDBImageBaseURL}
          />
        </StyledBoxSimilarProviders>
      </div>
    </article>
  );
};

export default MovieCard;
