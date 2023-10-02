import { Divider } from "@mui/material";

const CastCells = ({ list, TMDBConfigData, TMDBImageBaseURL, personPlaceholder }) => {
  const renderedCells = list.map((el, i) => {
    return (
      <li className='person-cell' key={`${el.id}${i}`}>
        <img
          src={
            el.profile_path
              ? `${TMDBImageBaseURL + TMDBConfigData.images.profile_sizes[1] + el.profile_path}`
              : personPlaceholder
          }
          alt='Cast or crew member'
          width={185}
          height={277}
          className='person-cell__image'
        />
        <a
          className='person-cell__name'
          key={el.id}
          href={`https://www.google.com/search?q=${el.name}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {el.name}
        </a>

        <Divider sx={{ margin: "0.2rem 0.5rem", backgroundColor: "hsl(0, 0%, 30%)" }} />

        <h3 className='person-cell__character'>{el.character}</h3>
      </li>
    );
  });

  return <ol className='movie-cast__cells-scroll'>{renderedCells}</ol>;
};

export default CastCells;
