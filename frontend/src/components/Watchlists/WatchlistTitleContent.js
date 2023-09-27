import { StyledWatchlistTitleText } from "../Utility/StyledComponents/StyledComponentsWatchlist";

const WatchlistTitleContent = ({ getMovieData, el, listView }) => {
  return (
    <div
      className='watchlist-accordion__entry-content'
      onClick={() => {
        getMovieData(el.title, el.imdbID);
      }}
    >
      <div className={`watchlist-accordion__entry-img-cont-${listView}`}>
        <img src={el.poster} alt='Watchlist entry poster' />
      </div>
      {listView !== "cells" && (
        <StyledWatchlistTitleText large={listView === "large"}>
          {el.title} <br /> {el.year}
        </StyledWatchlistTitleText>
      )}
    </div>
  );
};

export default WatchlistTitleContent;
