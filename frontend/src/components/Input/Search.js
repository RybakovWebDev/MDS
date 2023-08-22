import { useState } from "react";

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
import { WhiteClearIcon } from "../Utility/StyledComponents/StyledComponentsUtility";

const Search = ({ TMDBConfigData, getMovieData, searchMov, handleInputFocus, searchInput, setSearchInput }) => {
  const [options, setOptions] = useState([]);
  const [openSearchResults, setOpenSearchResults] = useState(false);

  const imageBaseURL = TMDBConfigData.images.secure_base_url;

  const handleOpen = () => {
    setOpenSearchResults(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "blur") {
      setOpenSearchResults(false);
    }
  };

  const handleSearchInput = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value === "") {
      setOptions([]);
    } else {
      const searchResults = await searchMov(value);
      console.log(searchResults.data.results);
      setOptions(searchResults.data.results.sort((a, b) => b.vote_count - a.vote_count));
      console.log(options);
    }
  };

  const handleSearchButtonClick = () => {
    if (searchInput) {
      console.log(searchInput);
      getMovieData(searchInput);
    }
  };

  return (
    <>
      <StyledAutocomplete
        open={openSearchResults}
        onOpen={handleOpen}
        onClose={handleClose}
        ListboxProps={{ className: "search__suggestions" }}
        freeSolo
        clearIcon={<WhiteClearIcon />}
        fullWidth
        options={options}
        getOptionLabel={(option) => option.title}
        onChange={(e, item) => {
          if (item) {
            setSearchInput(item.title);
            getMovieData(item.title, item.id);
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
                  <img
                    className='search__suggestions-image'
                    src={`${imageBaseURL + TMDBConfigData.images.poster_sizes[0] + option.poster_path}`}
                    alt='Title poster'
                  />
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
            placeholder='Start typing'
            variant='filled'
            InputProps={{
              ...params.InputProps,
              type: "text",
            }}
            onChange={handleSearchInput}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
          />
        )}
      />
      <StyledSearchButton onClick={handleSearchButtonClick}>
        <SearchOutlined sx={{ fontSize: "30px" }} />
      </StyledSearchButton>
    </>
  );
};

export default Search;
