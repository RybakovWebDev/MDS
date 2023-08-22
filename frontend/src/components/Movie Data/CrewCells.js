const CrewCells = ({ list, TMDBConfigData, TMDBImageBaseURL, personPlaceholder }) => {
  const key = "name";
  const removedDuplicates = [...new Map(list.map((item) => [item[key], item])).values()];

  const renderedCells = removedDuplicates.map((el) => {
    return (
      <li className={`movie-crew__person${removedDuplicates.length % 2 === 0 ? "" : "-odd"}`} key={el.id}>
        <img
          src={
            el.profile_path
              ? `${TMDBImageBaseURL + TMDBConfigData.images.profile_sizes[0] + el.profile_path}`
              : personPlaceholder
          }
          alt='Cast or crew member'
          width={45}
          height={67}
          className='movie-crew__image'
        />
        <div className='movie-crew__info'>
          <a
            className='movie-crew__name'
            key={el.id}
            href={`https://www.google.com/search?q=${el.name}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {el.name}
          </a>

          <h3 className='movie-crew__role'>{el.known_for_department}</h3>
        </div>
      </li>
    );
  });
  return <ul className='movie-crew__list'>{renderedCells}</ul>;
};

export default CrewCells;
