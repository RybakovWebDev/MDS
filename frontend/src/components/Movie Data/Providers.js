import { Typography } from "@mui/joy";

const Providers = ({ props, list, TMDBConfigData, TMDBImageBaseURL }) => {
  const regionName = new Intl.DisplayNames(["en"], { type: "region" });
  const providerList = list.results ? Object.entries(list.results) : [];

  const renderChoices = providerList.map((el, i) => {
    return (
      <option className='movie-providers__option' value={`${el[0]}`} key={i}>
        {regionName.of(el[0])}
      </option>
    );
  });

  const renderSelectedProvider = () => {
    const selectedProvider = props.movieProvider
      ? providerList.filter((el) => el[0] === props.movieProvider)
      : providerList.filter((el) => el[0] === navigator.languages[0].slice(-2));

    const providerData = selectedProvider.length !== 0 ? selectedProvider[0][1] : providerList[0][1];

    const renderProviderData = (providerData, category, title) => {
      return (
        <div className='movie-providers__data-source'>
          <h3 className='movie-providers__data-source-title'>{title}:</h3>
          {providerData?.[category] ? (
            providerData?.[category].map((el, i) => {
              return (
                <a
                  href={`https://www.google.com/search?q=${props.movData?.Title} ${props.movData?.Year} ${el.provider_name}`}
                  key={i}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    src={`${TMDBImageBaseURL + TMDBConfigData.images.logo_sizes[0] + el.logo_path}`}
                    alt={`Visit ${category} provider`}
                    className='movie-providers__data-logo'
                    width={45}
                    height={45}
                  />
                </a>
              );
            })
          ) : (
            <h3 className='movie-providers__data-unavailable '>Not available</h3>
          )}
        </div>
      );
    };

    return (
      <>
        {renderProviderData(providerData, "ads", "Watch for free with ads")}
        {renderProviderData(providerData, "rent", "Stream")}
        {renderProviderData(providerData, "buy", "Buy")}
        <h3 className='movie-providers__data-tmdb'>
          For full information visit{" "}
          <a className='movie-providers-data-link' href={providerData?.link} target='_blank' rel='noopener noreferrer'>
            the TMDB page
          </a>
          .
        </h3>
      </>
    );
  };

  return (
    <article className='movie-providers'>
      <div className='movie-providers__wrapper'>
        {list ? (
          <>
            <div className='movie-providers__select-wrapper'>
              <label className='movie-providers__select-label' htmlFor='provider-select'>
                Choose a country:
              </label>
              <select
                value={props.movieProvider ? props.movieProvider : navigator.languages[0].slice(-2)}
                name='providers'
                id='provider-select'
                onChange={props.handleProviderChange}
              >
                <option value=''>--Please select an option--</option>
                {renderChoices}
              </select>
            </div>
            <div>{renderSelectedProvider()}</div>
          </>
        ) : (
          <Typography mt='44%' level='h4' color='white' textAlign={"center"}>
            No streaming options found
            <br />
            😓
          </Typography>
        )}
      </div>
    </article>
  );
};

export default Providers;
