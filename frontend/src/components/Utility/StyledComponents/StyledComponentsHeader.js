import { Button, Dialog, DialogActions, FormControlLabel, MenuItem, TextField, styled } from "@mui/material";

export const StyledHeaderFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  display: "flex",
  justifyContent: "center",
  color: "#fff",
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#fff",
      "& + .MuiSwitch-track": {
        background: "#000",
      },
    },
  },
  "& .MuiFormControlLabel-label.Mui-disabled": {
    color: "#fff",
  },
  "& .MuiFormControlLabel-label": {
    position: "relative",
    "& > *": {
      width: "10rem",
      position: "absolute",
      marginLeft: "0.5rem",
    },
  },
  [theme.breakpoints.down("300")]: {
    "& .MuiFormControlLabel-label": {
      "& > *": {
        width: "10rem",
        position: "absolute",
        margin: "1.5rem 0 0 -3rem",
      },
    },
  },
}));

export const StyledHeaderButton = styled(Button)(() => ({
  color: "white",
  textTransform: "none",
  transition: "opacity 0.3s ease",
  "&.MuiButtonBase-root:hover": {
    backgroundColor: "transparent",
    opacity: "0.5",
  },
}));

export const StyledAuthDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: "#222222",
    color: "#fff",
    boxShadow: "0px 0px 20px rgb(0, 0, 0, 1)",
  },
  "& > .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    filter: "brightness(0.6)",
  },
  [theme.breakpoints.down("1279")]: {
    "& .MuiPaper-root": {
      margin: "0",
      padding: "0 0 3rem 0",
      width: "100%",
    },
    "& .MuiDialog-container": {
      flexWrap: "wrap",
      display: "flex",
      alignContent: "flex-end",
    },
  },
}));

export const StyledAuthDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "0 2rem 1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("1279")]: {
    padding: "0 1rem 1rem 2rem",
  },
}));

export const StyledAuthTextfield = styled(TextField)(() => ({
  height: "6rem",
  borderColor: "white",
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#333333",
  },
  "& label": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  "& label.Mui-focused": {
    color: "rgba(255, 255, 255, 1)",
  },
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  width: "10rem",
  display: "flex",
  justifyContent: "center",
}));
