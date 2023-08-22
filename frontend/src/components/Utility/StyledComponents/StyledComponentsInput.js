import { QuestionMark } from "@mui/icons-material";
import { Autocomplete, Box, IconButton, InputBase, TextField, Typography, styled } from "@mui/material";

export const StyledSearchTextfield = styled(TextField)(({ theme }) => ({
  height: "100%",
  "& .MuiInputBase-input": {
    marginLeft: "1rem",
    color: "white",
    fontSize: "24px",
    fontWeight: "500",
  },
  "& .MuiInputBase-root.MuiFilledInput-root:before, & .MuiInputBase-root.MuiFilledInput-root:hover:before, & .MuiInputBase-root.MuiFilledInput-root:after":
    {
      borderBottom: "none",
    },
  [theme.breakpoints.down("1279")]: {
    "& .MuiInputBase-input": {
      fontSize: "18px",
    },
  },
}));

export const StyledSearchButton = styled(IconButton)(({ theme }) => ({
  width: "4rem",
  margin: "0 0 0 1rem",
  color: "white",
  borderRadius: "0px",
  boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.2)",
  backgroundColor: "#333333a2",
  transition: "300ms ease",
  transitionProperty: "box-shadow, transform",
  "&:hover": {
    backgroundColor: "#333333a2",
    boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.6)",
  },
  "&:active": {
    transform: "scale(0.9)",
  },
  [theme.breakpoints.down("1279")]: {
    margin: "0 1rem 0 1rem",
    width: "3rem",
  },
}));

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "50%",

  backgroundColor: "#333333a2",
  boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.2)",
  transition: "300ms ease box-shadow",
  "& .MuiFormControl-root": {
    justifyContent: "center",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    padding: 0,
    "&:hover, &.Mui-focused": {
      backgroundColor: "transparent",
    },
  },
  "&:hover": {
    boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.6)",
  },
  [theme.breakpoints.down("1279")]: {
    margin: "0 0 0 1rem",
    width: "100%",
  },
}));

export const StyledAutocompleteSuggestionWrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

export const StyledAutocompleteSuggestionTitle = styled(Typography)(({ theme }) => ({
  margin: "0 1rem 0 1rem",
  fontSize: "20px",
  [theme.breakpoints.down("1279")]: {
    margin: "0 0.5rem 0 0.5rem",
    fontSize: "calc(100vh / 60)",
  },
}));

export const StyledAutocompleteSuggestionYear = styled(Typography)(({ theme }) => ({
  color: "gray",
  fontSize: "20px",
  [theme.breakpoints.down("1279")]: {
    // fontSize: "12px",
    fontSize: "calc(100vh / 60)",
  },
}));

export const StyledAutocompleteSuggestionPlaceholder = styled(QuestionMark)(({ theme }) => ({
  width: "92px",
  height: "138px",
  [theme.breakpoints.down("1279")]: {
    width: "40px",
    height: "60px",
  },
}));

export const StyledInputChatbot = styled(InputBase)(({ theme }) => ({
  height: "4rem",
  paddingLeft: "1rem",
  m: "0",
  color: "#fff",
  fontSize: "18px",
  borderRight: "1px solid #222222",
  flex: 1,
}));
