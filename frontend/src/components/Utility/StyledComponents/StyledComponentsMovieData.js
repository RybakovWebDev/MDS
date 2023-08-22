import { AspectRatio, Card } from "@mui/joy";
import { AccordionSummary, Box, styled } from "@mui/material";

export const StyledVideoCard = styled(Card)(({ theme }) => ({
  minWidth: "20rem",
  marginRight: "1rem",
  marginLeft: "1rem",
  marginBottom: "1rem",
  marginTop: "1rem",
  backgroundColor: "transparent",
  boxShadow: "0px 0px 10px rgb(0, 0, 0, 0.5)",
  transition: "box-shadow 300ms ease",
  "&:hover": {
    boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.9)",
  },
  [theme.breakpoints.down("1279")]: {
    minWidth: "18rem",
  },
}));

export const StyledPosterCard = styled(Card)(({ theme }) => ({
  minWidth: "185px",
  marginRight: theme.spacing(3),
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  backgroundColor: "#333333",
  boxShadow: "0px 0px 10px rgb(0, 0, 0, 0.5)",
  transition: "box-shadow 300ms ease, transform 200ms ease",
  "&:hover": {
    boxShadow: "0px 0px 30px rgb(0, 0, 0, 0.9)",
    transform: "scale(1.03)",
  },
  [theme.breakpoints.down("1279")]: {
    minWidth: "82px",
  },
}));

export const StyledAspectRatioVideo = styled(AspectRatio)(() => ({
  "& .MuiAspectRatio-content": {
    backgroundColor: "transparent",
  },
}));

export const StyledAspectRatioPoster = styled(AspectRatio)(() => ({
  borderRadius: "10px",
  "& .MuiAspectRatio-content": {
    backgroundColor: "transparent",
  },
}));

export const StyledAccordionSummaryPosters = styled(AccordionSummary)(({ theme }) => ({
  cursor: "default !important",

  [theme.breakpoints.down("1279")]: {
    "& .MuiAccordionSummary-content": {
      marginBottom: "1rem",
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
  },
}));

export const StyledBoxPostersAccordionSummary = styled(Box)(({ theme }) => ({
  marginBottom: "1rem",
  height: 350,
  display: "flex",
  cursor: "default",
  [theme.breakpoints.down("1279")]: {
    marginBottom: 0,
    height: "100%",
    flexWrap: "wrap",
  },
}));

export const StyledBoxPostersAccordionDetails = styled(Box)(({ theme }) => ({
  marginBottom: "2rem",
  height: 350,
  display: "flex",
  [theme.breakpoints.down("1279")]: {
    marginBottom: "1rem",
    height: "100%",
    flexWrap: "wrap",
  },
}));

export const StyledBoxSimilarProviders = styled(Box)(({ theme }) => ({
  width: "98%",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("1279")]: {
    margin: "auto",
    width: "95%",
    flexDirection: "column",
  },
}));
