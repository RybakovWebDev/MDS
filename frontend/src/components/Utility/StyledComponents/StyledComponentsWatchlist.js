import { Input } from "@mui/joy";
import { AccordionDetails, AccordionSummary, Button, TextField, Typography, styled } from "@mui/material";

export const StyledWatchlistNameTextfield = styled(TextField)(({ theme }) => ({
  width: "100%",
  borderColor: "white",

  "& .MuiInputBase-input": {
    color: "white",
    fontFamily: "Inter",
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "1.2",
    "&.Mui-disabled": {
      WebkitTextFillColor: "#fff",
    },
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#333333",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "hsl(0, 0%, 50%)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiInputBase-root.Mui-disabled:before": {
    borderBottom: "none",
  },
  [theme.breakpoints.down("1279")]: {
    margin: "0 1rem 0 1rem",
    width: "95%",
    "& .MuiInputBase-input": {
      lineHeight: "1.2",
    },
  },
}));

export const StyledAccordionSummaryWatchlist = styled(AccordionSummary)(({ theme }) => ({
  [theme.breakpoints.down("1279")]: {
    "& .MuiAccordionSummary-content": {
      margin: "0",
      padding: "0.5rem 0 0.5rem 0",
    },
  },
}));

export const StyledAccordionDetailsWatchlist = styled(AccordionDetails)(({ theme }) => ({
  maxHeight: "30rem",
  paddingBottom: "5rem",
  borderTop: "1px solid #333333",
  overflowY: "scroll",
  overflowX: "hidden",
  [theme.breakpoints.down("1279")]: {
    paddingRight: "0",
  },
}));

export const StyledWatchlistName = styled(Typography)(({ theme }) => ({
  margin: "0",
  color: "white",
  fontSize: "18px",
  fontWeight: "600",
  fontFamily: "Inter",
  [theme.breakpoints.down("1279")]: {
    fontSize: "16px",
  },
}));

export const StyledWatchlistNameInput = styled(Input)(({ theme }) => ({
  width: "90%",
  backgroundColor: "#333333",
  color: "white",
  lineHeight: "normal",
  fontSize: "18px",
  fontWeight: "600",
  fontFamily: "Inter",
  [theme.breakpoints.down("1279")]: {
    width: "90%",
  },
}));

export const StyledWatchlistTitleText = styled(Typography)(({ theme }) => ({
  margin: "0 0 0 1rem",
  color: "white",
  fontSize: "16px",
  [theme.breakpoints.down("1279")]: {
    margin: "0 1rem 0 1rem",
    fontSize: "14px",
  },
}));

export const StyledWatchlistTitleRemoveButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
    color: "black",
    borderColor: "#fff",
  },
  minWidth: "2rem",
  [theme.breakpoints.down("1279")]: {
    padding: "0",
  },
}));
