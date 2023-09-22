import { Backdrop, Button, TextField, styled } from "@mui/material";

export const StyledProfileNameTextfield = styled(TextField)(({ theme }) => ({
  marginRight: "1rem",
  borderColor: "white",

  "& .MuiInputBase-input": {
    color: "white",
    fontFamily: "Inter",
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
