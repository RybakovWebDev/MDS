import { Input } from "@mui/joy";
import { AccordionDetails, AccordionSummary, Backdrop, Button, TextField, Typography, styled } from "@mui/material";

export const StyledProfileNameTextfield = styled(TextField)(({ theme }) => ({
  marginRight: "1rem",
  borderColor: "white",
  "& .MuiInputBase-input": {
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    "&.Mui-disabled": {
      WebkitTextFillColor: "#fff",
    },
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#222222",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputBase-root.Mui-disabled:before": {
    borderBottom: "none",
  },
}));

export const StyledProfileImageBackdrop = styled(Backdrop)(() => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgb(0, 0, 0, 0.5)",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
  },
}));

export const StyledProfileImageButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#333333",
  boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.5)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "black",
    boxShadow: "0px 0px 30px rgb(0, 0, 0, 1)",
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
  [theme.breakpoints.down("1279")]: {
    fontSize: "16px",
  },
}));

export const StyledWatchlistNameInput = styled(Input)(({ theme }) => ({
  width: "70%",
  backgroundColor: "#333333",
  color: "white",
  lineHeight: "normal",
  fontSize: "18px",
  fontWeight: "600",
  [theme.breakpoints.down("1279")]: {
    width: "90%",
  },
}));

export const StyledWatchlistTitleText = styled(Typography)(({ theme }) => ({
  marginLeft: "1rem",
  color: "white",
  fontSize: "16px",
  [theme.breakpoints.down("1279")]: {
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
  [theme.breakpoints.down("1279")]: {
    minWidth: "2rem",
    padding: "0",
  },
}));
