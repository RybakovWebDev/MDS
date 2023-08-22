import { Backdrop } from "@mui/material";
import { WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";

const MediaViewer = ({ handleLoading, openMedia, handleMediaClick, loading, media }) => {
  return (
    <Backdrop open={openMedia} onClick={handleMediaClick} sx={{ backgroundColor: "#000000cc" }}>
      <div className='movie-media__responsive'>
        {loading && <WhiteSpinner sx={{ position: "absolute" }} />}
        {media.type === "img" ? (
          <img
            src={media.url}
            alt='Poster for the selected title'
            height={window.innerHeight - 200}
            onLoad={handleLoading}
          />
        ) : (
          <iframe
            id='mediaIframe'
            width='853'
            height='480'
            src={media.url}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded media'
            sandbox='allow-scripts allow-presentation allow-same-origin'
            onLoad={handleLoading}
          />
        )}
      </div>
    </Backdrop>
  );
};

export default MediaViewer;
