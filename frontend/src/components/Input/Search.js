import { useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import { Box } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import {
  StyledAutocomplete,
  StyledAutocompleteSuggestionPlaceholder,
  StyledAutocompleteSuggestionTitle,
  StyledAutocompleteSuggestionWrapperBox,
  StyledAutocompleteSuggestionYear,
  StyledSearchButton,
  StyledSearchTextfield,
} from "../Utility/StyledComponents/StyledComponentsInput";
import { DarkSpinner, WhiteClearIcon, WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";

const Search = ({
  TMDBConfigData,
  getMovieData,
  searchMov,
  handleInputFocus,
  searchInput,
  setSearchInput,
  isTabletOrMobile,
}) => {
  const [options, setOptions] = useState([]);
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const imageBaseURL = TMDBConfigData.images.secure_base_url;
  let resultsTimeout;

  const handleOpen = () => {
    setOpenSearchResults(true);
  };

  const handleClose = (e, reason) => {
    if (reason !== "blur") {
      setOpenSearchResults(false);
    }
  };

  const debouncedCallback = useDebouncedCallback(async (value) => {
    if (value === "") {
      setOptions([]);
      setImagesLoaded({});
    } else {
      clearTimeout(resultsTimeout);
      resultsTimeout = setTimeout(() => setLoadingResults(true), 500);
      const searchResults = await searchMov(value);
      clearTimeout(resultsTimeout);
      setOptions(searchResults.data.results.sort((a, b) => b.vote_count - a.vote_count));
      setLoadingResults(false);
    }
  }, 300);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    debouncedCallback(value);
  };

  const handleSearchButtonClick = () => {
    if (searchInput) {
      getMovieData(searchInput);
    }
  };

  return (
    <>
      <StyledAutocomplete
        open={openSearchResults}
        onOpen={handleOpen}
        onClose={handleClose}
        clearIcon={<WhiteClearIcon />}
        ListboxProps={{ className: "search__suggestions", sx: { maxHeight: "45vh" } }}
        freeSolo
        fullWidth
        options={options}
        getOptionLabel={(option) => (typeof option === "object" ? option.title : option)}
        onChange={(e, item) => {
          if (item && typeof item === "object") {
            setSearchInput(item.title);
            getMovieData(item.title, item.id);
          } else if (item && typeof item === "string") {
            getMovieData(searchInput);
          }
        }}
        onInputChange={(e, item) => {
          if (item === "") {
            setSearchInput("");
            setOptions([]);
          }
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <StyledAutocompleteSuggestionWrapperBox>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {option.poster_path ? (
                  <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {!imagesLoaded[option.id] && <DarkSpinner sx={{ position: "absolute" }} />}
                    <img
                      className={`search__suggestions-image${!imagesLoaded[option.id] ? " transparent" : ""}`}
                      src={`${imageBaseURL + TMDBConfigData.images.poster_sizes[0] + option.poster_path}`}
                      alt='Title poster'
                      height={`${isTabletOrMobile ? "60" : "138"}px`}
                      width={TMDBConfigData.images.poster_sizes[0].slice(1, 3)}
                      onLoad={() => setImagesLoaded((prev) => ({ ...prev, [option.id]: true }))}
                    />
                  </Box>
                ) : (
                  <StyledAutocompleteSuggestionPlaceholder />
                )}

                <StyledAutocompleteSuggestionTitle>{option?.title}</StyledAutocompleteSuggestionTitle>
              </Box>

              <StyledAutocompleteSuggestionYear>
                {option.release_date ? option.release_date.slice(0, 4) : "N/A"}
              </StyledAutocompleteSuggestionYear>
            </StyledAutocompleteSuggestionWrapperBox>
          </li>
        )}
        renderInput={(params) => (
          <StyledSearchTextfield
            {...params}
            placeholder='Type movie name here'
            variant='filled'
            InputProps={{
              ...params.InputProps,
              type: "text",
            }}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
          />
        )}
      />
      <StyledSearchButton onClick={handleSearchButtonClick}>
        {loadingResults ? <WhiteSpinner size={"30px"} /> : <SearchOutlined sx={{ fontSize: "30px" }} />}
      </StyledSearchButton>
    </>
  );
};

export default Search;
