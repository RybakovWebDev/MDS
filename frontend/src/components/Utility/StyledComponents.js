// import { Add, Clear, DragHandle, QuestionMark } from "@mui/icons-material";
// import { AspectRatio, Card, Input } from "@mui/joy";
// import {
//   AccordionDetails,
//   AccordionSummary,
//   Autocomplete,
//   Backdrop,
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   FormControlLabel,
//   IconButton,
//   MenuItem,
//   Switch,
//   TextField,
//   Typography,
//   styled,
// } from "@mui/material";

// export const StyledHeaderFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
//   margin: 0,
//   display: "flex",
//   justifyContent: "center",
//   color: "#fff",
//   "& .MuiSwitch-switchBase": {
//     "&.Mui-checked": {
//       color: "#fff",
//       "& + .MuiSwitch-track": {
//         background: "#000",
//       },
//     },
//   },
//   "& .MuiFormControlLabel-label.Mui-disabled": {
//     color: "#fff",
//   },
//   "& .MuiFormControlLabel-label": {
//     position: "relative",
//     "& > *": {
//       width: "10rem",
//       position: "absolute",
//       marginLeft: "0.5rem",
//     },
//   },
//   [theme.breakpoints.down("300")]: {
//     "& .MuiFormControlLabel-label": {
//       "& > *": {
//         width: "10rem",
//         position: "absolute",
//         margin: "1.5rem 0 0 -3rem",
//       },
//     },
//   },
// }));

// export const StyledHeaderButton = styled(Button)(() => ({
//   color: "white",
//   textTransform: "none",
//   transition: "opacity 0.3s ease",
//   "&.MuiButtonBase-root:hover": {
//     backgroundColor: "transparent",
//     opacity: "0.5",
//   },
// }));

// export const StyledAuthDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiPaper-root": {
//     background: "#222222",
//     color: "#fff",
//     boxShadow: "0px 0px 20px rgb(0, 0, 0, 1)",
//   },
//   "& > .MuiBackdrop-root": {
//     backdropFilter: "blur(5px)",
//     filter: "brightness(0.6)",
//   },
//   [theme.breakpoints.down("1279")]: {
//     "& .MuiPaper-root": {
//       margin: "0",
//       padding: "0 0 3rem 0",
//       width: "100%",
//     },
//     "& .MuiDialog-container": {
//       flexWrap: "wrap",
//       display: "flex",
//       alignContent: "flex-end",
//     },
//   },
// }));

// export const StyledAuthDialogActions = styled(DialogActions)(({ theme }) => ({
//   padding: "0 2rem 1rem 2rem",
//   display: "flex",
//   justifyContent: "space-between",
//   [theme.breakpoints.down("1279")]: {
//     padding: "0 1rem 1rem 2rem",
//   },
// }));

// export const StyledAuthTextfield = styled(TextField)(() => ({
//   height: "6rem",
//   borderColor: "white",
//   "& .MuiOutlinedInput-root": {
//     "&:hover fieldset": {
//       borderColor: "rgba(255, 255, 255, 0.5)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#fff",
//     },
//   },
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#333333",
//   },
//   "& label": {
//     color: "rgba(255, 255, 255, 0.5)",
//   },
//   "& label.Mui-focused": {
//     color: "rgba(255, 255, 255, 1)",
//   },
// }));

// export const StyledMenuItem = styled(MenuItem)(() => ({
//   width: "10rem",
//   display: "flex",
//   justifyContent: "center",
// }));

// export const StyledSearchTextfield = styled(TextField)(({ theme }) => ({
//   height: "100%",
//   "& .MuiInputBase-input": {
//     marginLeft: "1rem",
//     color: "white",
//     fontSize: "24px",
//     fontWeight: "500",
//   },
//   "& .MuiInputBase-root.MuiFilledInput-root:before, & .MuiInputBase-root.MuiFilledInput-root:hover:before, & .MuiInputBase-root.MuiFilledInput-root:after":
//     {
//       borderBottom: "none",
//     },
//   [theme.breakpoints.down("1279")]: {
//     "& .MuiInputBase-input": {
//       fontSize: "18px",
//     },
//   },
// }));

// export const StyledSearchButton = styled(IconButton)(({ theme }) => ({
//   width: "4rem",
//   margin: "0 0 0 1rem",
//   color: "white",
//   borderRadius: "0px",
//   boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.2)",
//   backgroundColor: "#333333a2",
//   transition: "300ms ease",
//   transitionProperty: "box-shadow, transform",
//   "&:hover": {
//     backgroundColor: "#333333a2",
//     boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.6)",
//   },
//   "&:active": {
//     transform: "scale(0.9)",
//   },
//   [theme.breakpoints.down("1279")]: {
//     margin: "0 1rem 0 1rem",
//     width: "3rem",
//   },
// }));

// export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
//   width: "50%",

//   backgroundColor: "#333333a2",
//   boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.2)",
//   transition: "300ms ease box-shadow",
//   "& .MuiFormControl-root": {
//     justifyContent: "center",
//   },
//   "& .MuiFilledInput-root": {
//     backgroundColor: "transparent",
//     padding: 0,
//     "&:hover, &.Mui-focused": {
//       backgroundColor: "transparent",
//     },
//   },
//   "&:hover": {
//     boxShadow: "0px 0px 20px rgb(1, 1, 1, 0.6)",
//   },
//   [theme.breakpoints.down("1279")]: {
//     margin: "0 0 0 1rem",
//     width: "100%",
//   },
// }));

// export const StyledAutocompleteSuggestionWrapperBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   width: "100%",
//   [theme.breakpoints.down("1279")]: {
//     // padding: "0",
//   },
// }));

// export const StyledAutocompleteSuggestionTitle = styled(Typography)(({ theme }) => ({
//   margin: "0 1rem 0 1rem",
//   fontSize: "20px",
//   [theme.breakpoints.down("1279")]: {
//     margin: "0 0.5rem 0 0.5rem",
//     // fontSize: "14px",
//     fontSize: "calc(100vh / 60)",
//   },
// }));

// export const StyledAutocompleteSuggestionYear = styled(Typography)(({ theme }) => ({
//   color: "gray",
//   fontSize: "20px",
//   [theme.breakpoints.down("1279")]: {
//     // fontSize: "12px",
//     fontSize: "calc(100vh / 60)",
//   },
// }));

// export const StyledAutocompleteSuggestionPlaceholder = styled(QuestionMark)(({ theme }) => ({
//   width: "92px",
//   height: "138px",
//   [theme.breakpoints.down("1279")]: {
//     width: "40px",
//     height: "60px",
//   },
// }));

// export const StyledVideoCard = styled(Card)(({ theme }) => ({
//   minWidth: "20rem",
//   marginRight: "1rem",
//   marginLeft: "1rem",
//   marginBottom: "1rem",
//   marginTop: "1rem",
//   backgroundColor: "transparent",
//   boxShadow: "0px 0px 10px rgb(0, 0, 0, 0.5)",
//   transition: "box-shadow 300ms ease",
//   "&:hover": {
//     boxShadow: "0px 0px 20px rgb(0, 0, 0, 0.9)",
//   },
//   [theme.breakpoints.down("1279")]: {
//     minWidth: "18rem",
//   },
// }));

// export const StyledPosterCard = styled(Card)(({ theme }) => ({
//   minWidth: "185px",
//   marginRight: theme.spacing(3),
//   marginLeft: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   marginTop: theme.spacing(2),
//   backgroundColor: "#333333",
//   boxShadow: "0px 0px 10px rgb(0, 0, 0, 0.5)",
//   transition: "box-shadow 300ms ease, transform 200ms ease",
//   "&:hover": {
//     boxShadow: "0px 0px 30px rgb(0, 0, 0, 0.9)",
//     transform: "scale(1.03)",
//   },
//   [theme.breakpoints.down("1279")]: {
//     minWidth: "82px",
//   },
// }));

// export const StyledAspectRatioVideo = styled(AspectRatio)(() => ({
//   "& .MuiAspectRatio-content": {
//     backgroundColor: "transparent",
//   },
// }));

// export const StyledAspectRatioPoster = styled(AspectRatio)(() => ({
//   borderRadius: "10px",
//   "& .MuiAspectRatio-content": {
//     backgroundColor: "transparent",
//   },
// }));

// export const StyledAccordionSummaryPosters = styled(AccordionSummary)(({ theme }) => ({
//   cursor: "default !important",

//   [theme.breakpoints.down("1279")]: {
//     "& .MuiAccordionSummary-content": {
//       marginBottom: "1rem",
//     },
//     "& .MuiAccordionSummary-content.Mui-expanded": {
//       margin: 0,
//     },
//   },
// }));

// export const StyledBoxPostersAccordionSummary = styled(Box)(({ theme }) => ({
//   marginBottom: "1rem",
//   height: 350,
//   display: "flex",
//   cursor: "default",
//   [theme.breakpoints.down("1279")]: {
//     marginBottom: 0,
//     height: "100%",
//     flexWrap: "wrap",
//   },
// }));

// export const StyledBoxPostersAccordionDetails = styled(Box)(({ theme }) => ({
//   marginBottom: "2rem",
//   height: 350,
//   display: "flex",
//   [theme.breakpoints.down("1279")]: {
//     marginBottom: "1rem",
//     height: "100%",
//     flexWrap: "wrap",
//   },
// }));

// export const StyledBoxSimilarProviders = styled(Box)(({ theme }) => ({
//   width: "98%",
//   display: "flex",
//   justifyContent: "space-between",
//   [theme.breakpoints.down("1279")]: {
//     margin: "auto",
//     width: "95%",
//     flexDirection: "column",
//   },
// }));

// export const StyledProfileNameTextfield = styled(TextField)(({ theme }) => ({
//   marginRight: "1rem",
//   borderColor: "white",
//   "& .MuiInputBase-input": {
//     color: "white",
//     fontSize: "24px",
//     fontWeight: "600",
//     "&.Mui-disabled": {
//       WebkitTextFillColor: "#fff",
//     },
//   },
//   "& .MuiInput-underline:hover:before": {
//     borderBottomColor: "#222222",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "white",
//   },
//   "& .MuiInputBase-root.Mui-disabled:before": {
//     borderBottom: "none",
//   },
// }));

// export const StyledProfileImageBackdrop = styled(Backdrop)(() => ({
//   position: "absolute",
//   backgroundColor: "rgb(0, 0, 0, 0.1)",
//   borderRadius: "10px",
//   "&:hover": {
//     backgroundColor: "rgb(0, 0, 0, 0.3)",
//   },
// }));

// export const StyledAccordionSummaryWatchlist = styled(AccordionSummary)(({ theme }) => ({
//   [theme.breakpoints.down("1279")]: {
//     "& .MuiAccordionSummary-content": {
//       margin: "0",
//       padding: "0.5rem 0 0.5rem 0",
//     },
//   },
// }));

// export const StyledAccordionDetailsWatchlist = styled(AccordionDetails)(({ theme }) => ({
//   maxHeight: "30rem",
//   paddingBottom: "5rem",
//   borderTop: "1px solid #333333",
//   overflowY: "scroll",
//   overflowX: "hidden",
//   [theme.breakpoints.down("1279")]: {
//     paddingRight: "0",
//   },
// }));

// export const StyledWatchlistName = styled(Typography)(({ theme }) => ({
//   margin: "0",
//   color: "white",
//   fontSize: "18px",
//   fontWeight: "600",
//   [theme.breakpoints.down("1279")]: {
//     fontSize: "16px",
//   },
// }));

// export const StyledWatchlistNameInput = styled(Input)(({ theme }) => ({
//   width: "70%",
//   backgroundColor: "#333333",
//   color: "white",
//   [theme.breakpoints.down("1279")]: {
//     width: "90%",
//   },
// }));

// export const StyledWatchlistTitleText = styled(Typography)(({ theme }) => ({
//   marginLeft: "1rem",
//   color: "white",
//   fontSize: "16px",
//   [theme.breakpoints.down("1279")]: {
//     fontSize: "14px",
//   },
// }));

// export const StyledWatchlistTitleRemoveButton = styled(Button)(({ theme }) => ({
//   color: "#fff",
//   borderColor: "#fff",
//   "&:hover": {
//     backgroundColor: "#fff",
//     color: "black",
//     borderColor: "#fff",
//   },
//   [theme.breakpoints.down("1279")]: {
//     minWidth: "2rem",
//     padding: "0",
//   },
// }));

// export const WhiteSpinner = styled(CircularProgress)(() => ({
//   color: "#fff",
// }));

// export const WhiteAddIcon = styled(Add)(() => ({
//   color: "#fff",
// }));

// export const WhiteClearIcon = styled(Clear)(() => ({
//   color: "#fff",
// }));

// export const FadeIcon = styled(Add)(({ visible }) => ({
//   position: "absolute",
//   color: "#fff",
//   opacity: visible ? 1 : 0,
//   transition: "opacity 0.1s linear",
// }));

// export const WhiteDragHandleIcon = styled(DragHandle)(() => ({
//   color: "#fff",
// }));

// export const StyledSwitch = styled(Switch)(() => ({
//   "& .MuiSwitch-switchBase": {
//     "&.Mui-checked": {
//       color: "#fff",
//       "& + .MuiSwitch-track": {
//         background: "#000",
//       },
//     },
//   },
// }));

// export const StyledButton = styled(Button)(() => ({
//   color: "#fff",
//   borderColor: "#fff",
//   "&:hover": {
//     backgroundColor: "#fff",
//     color: "black",
//     borderColor: "#fff",
//   },
// }));

// export const StyledButtonSmall = styled(Button)(() => ({
//   minWidth: "10px",
//   maxWidth: "45px",
//   color: "#fff",
//   borderColor: "#fff",
//   "&:hover": {
//     backgroundColor: "#fff",
//     color: "black",
//     borderColor: "#fff",
//   },
// }));

// export const StyledDialog = styled(Dialog)(() => ({
//   "& .MuiPaper-root": {
//     background: "#222222",
//     color: "#fff",
//     boxShadow: "0px 0px 20px rgb(0, 0, 0, 1)",
//   },
//   "& > .MuiBackdrop-root": {
//     backdropFilter: "blur(5px)",
//     filter: "brightness(0.6)",
//   },
// }));

// export const Caret = styled("div")`
//   position: absolute;
//   top: -8px;
//   left: calc(50% - 8px);
//   border-style: solid;
//   border-width: 0 8px 8px 8px;
//   border-color: transparent transparent #fff transparent;
// `;
