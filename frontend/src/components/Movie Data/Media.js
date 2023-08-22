import { useState } from "react";

import { CardOverflow, Link, Typography } from "@mui/joy";
import { Accordion, AccordionDetails } from "@mui/material";
import { ExpandMoreOutlined, PlayCircleTwoTone } from "@mui/icons-material";

import MediaViewer from "./MediaViewer";
import {
  StyledAccordionSummaryPosters,
  StyledAspectRatioPoster,
  StyledAspectRatioVideo,
  StyledBoxPostersAccordionDetails,
  StyledBoxPostersAccordionSummary,
  StyledPosterCard,
  StyledVideoCard,
} from "../Utility/StyledComponents/StyledComponentsMovieData";

const Media = ({ movDataTMDB, TMDBConfigData, shadowVideos, handleScroll }) => {
  const [postersOpen, setPostersOpen] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);
  const [media, setMedia] = useState();
  const [loading, setLoading] = useState(false);

  const posters = movDataTMDB.images.posters;
  const videos = [
    ...movDataTMDB.videos.results.filter((v) => v.type === "Trailer"),
    ...movDataTMDB.videos.results.filter((v) => v.type !== "Trailer"),
  ];
  const imgSizes = TMDBConfigData.images.poster_sizes;

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleMediaClick = (url, type) => {
    if (!openMedia) handleLoading();
    setOpenMedia(!openMedia);
    setMedia({ url: url, type: type });
  };

  const togglePosters = (e) => {
    setPostersOpen(!postersOpen);
  };

  const renderVideoCells = () => {
    const videoData = videos.map((v) => {
      return {
        key: v.key,
        video: `https://www.youtube.com/watch?v=${v.key}`,
        thumbnail: `https://img.youtube.com/vi/${v.key}/hqdefault.jpg`,
        name: v.name,
        type: v.type,
        site: v.site,
      };
    });
    return videoData.map((item) => {
      return (
        <li key={item.video}>
          <StyledVideoCard variant='plain'>
            <CardOverflow>
              <StyledAspectRatioVideo ratio='16/9'>
                <Link
                  component='button'
                  onClick={() => handleMediaClick(`https://www.youtube.com/embed/${item.key}`, "video")}
                >
                  <PlayCircleTwoTone sx={{ position: "absolute", fontSize: "4rem", color: "white" }} />
                  <img src={item.thumbnail} loading='lazy' alt='Movie trailer' />
                </Link>
              </StyledAspectRatioVideo>
            </CardOverflow>
            <Typography level='h2' sx={{ fontSize: "md", mt: "1rem", color: "white" }}>
              {item.name}
            </Typography>
            <Typography level='body2' sx={{ mt: "0.3rem", color: "white" }}>
              {item.type} | {item.site}
            </Typography>
          </StyledVideoCard>
        </li>
      );
    });
  };

  const posterCard = (item) => {
    return (
      <StyledPosterCard key={item.full} variant='plain'>
        <CardOverflow>
          <StyledAspectRatioPoster ratio={2 / 3}>
            <img
              className='movie-media__poster-thumbnail'
              src={item.thumbnail}
              loading='lazy'
              alt='Movie poster'
              onClick={() => handleMediaClick(item.full, "img")}
            />
          </StyledAspectRatioPoster>
        </CardOverflow>
      </StyledPosterCard>
    );
  };

  const renderPosterCells = () => {
    const posterData = posters
      .map((p) => {
        return {
          full: `${TMDBConfigData.images.base_url + imgSizes[imgSizes.length - 1] + p.file_path}`,
          thumbnail: `${TMDBConfigData.images.base_url + imgSizes[2] + p.file_path}`,
          locale: p.iso_639_1,
          aspectRatio: p.aspect_ratio,
          votes: p.vote_average,
        };
      })
      .slice(0, posters.length > 40 ? 40 : posters.length);

    let posterDataSplit = [];
    while (posterData.length) {
      posterDataSplit.push(posterData.splice(0, 4));
    }

    return posters.length <= 4 ? (
      <StyledBoxPostersAccordionSummary sx={{ paddingBottom: "0.5rem", justifyContent: "center" }}>
        {posterDataSplit[0].map((item) => {
          return posterCard(item);
        })}
      </StyledBoxPostersAccordionSummary>
    ) : (
      <Accordion expanded={postersOpen} sx={{ backgroundColor: "#333333", boxShadow: "none", overflowX: "hidden" }}>
        <StyledAccordionSummaryPosters
          expandIcon={
            <ExpandMoreOutlined
              onClick={togglePosters}
              sx={{ margin: 0, color: "white", fontSize: 30, cursor: "pointer" }}
            />
          }
        >
          <StyledBoxPostersAccordionSummary>
            {posterDataSplit[0].map((item) => {
              return posterCard(item);
            })}
          </StyledBoxPostersAccordionSummary>
        </StyledAccordionSummaryPosters>
        <AccordionDetails>
          {posterDataSplit.slice(1).map((chunk) => {
            return (
              <StyledBoxPostersAccordionDetails key={chunk[0].thumbnail}>
                {chunk.map((item) => {
                  return posterCard(item);
                })}
              </StyledBoxPostersAccordionDetails>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <article className='movie-media'>
      <>
        {!videos || videos.length === 0 ? (
          ""
        ) : (
          <>
            <h2 className='movie-media__section-name'>Videos</h2>
            <ul
              className={`movie-media__videos ${
                shadowVideos && videos.length > 2 ? "movie-media__videos--shadow-on" : "movie-media__videos--shadow-off"
              }`}
              onScroll={handleScroll}
            >
              {renderVideoCells()}
            </ul>
          </>
        )}

        {!posters || posters.length === 0 ? (
          ""
        ) : (
          <>
            <h2 className='movie-media__section-name'>Posters</h2>
            <div className='movie-media__posters'>{renderPosterCells()}</div>
          </>
        )}
      </>

      {openMedia && (
        <MediaViewer
          handleLoading={handleLoading}
          openMedia={openMedia}
          handleMediaClick={handleMediaClick}
          loading={loading}
          media={media}
        />
      )}
    </article>
  );
};

export default Media;
