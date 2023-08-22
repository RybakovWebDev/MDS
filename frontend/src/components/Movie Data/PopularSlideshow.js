import { Fade } from "@mui/material";
import { useEffect, useState } from "react";

const PopularSlideshow = ({
  showPopular,
  setShowPopular,
  posters,
  TMDBConfigData,
  TMDBImageBaseURL,
  personPlaceholder,
}) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const firstHalf = Array.isArray(posters) ? posters.slice(0, posters.length / 2) : null;
  const combinedArr = Array.isArray(posters) ? [...posters, ...firstHalf] : null;

  useEffect(() => {
    if (loadedImages > 10) setShowPopular(true);
  }, [loadedImages, setShowPopular]);

  const posterLoadHandler = () => {
    setLoadedImages((prev) => prev + 1);
  };

  function renderPosterArray() {
    const slideshow = Array.isArray(combinedArr)
      ? combinedArr.map((el, i) => {
          return (
            <img
              src={
                el.poster_path
                  ? `${TMDBImageBaseURL + TMDBConfigData?.images?.poster_sizes[5] + el.poster_path}`
                  : personPlaceholder
              }
              alt={`Current popular movie poster for ${el.original_title}`}
              className='popular-slideshow__image'
              key={el.id + i}
              onLoad={posterLoadHandler}
            />
          );
        })
      : null;
    return slideshow;
  }

  return (
    <article className={`popular-slideshow__wrapper`}>
      <Fade in={showPopular} timeout={showPopular ? 500 : 300} easing={{ enter: "ease-in", exit: "ease-out" }}>
        <div className='popular-slideshow__images-wrapper'>{renderPosterArray()}</div>
      </Fade>
    </article>
  );
};

export default PopularSlideshow;
