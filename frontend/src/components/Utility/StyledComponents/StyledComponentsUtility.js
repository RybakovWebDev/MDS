import { Add, Clear, DragHandle } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, Switch, styled } from "@mui/material";

export const WhiteSpinner = styled(CircularProgress)(() => ({
  color: "#fff",
}));

export const WhiteAddIcon = styled(Add)(() => ({
  color: "#fff",
}));

export const WhiteClearIcon = styled(Clear)(() => ({
  color: "#fff",
}));

export const FadeIcon = styled(Add)(({ visible }) => ({
  position: "absolute",
  color: "#fff",
  opacity: visible ? 1 : 0,
  transition: "opacity 0.1s linear",
}));

export const WhiteDragHandleIcon = styled(DragHandle)(() => ({
  color: "#fff",
}));

export const StyledSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#fff",
      "& + .MuiSwitch-track": {
        background: "#000",
      },
    },
  },
}));

export const StyledButton = styled(Button)(() => ({
  color: "#fff",
  borderColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
    color: "black",
    borderColor: "#fff",
  },
}));

export const StyledButtonSmall = styled(Button)(() => ({
  minWidth: "10px",
  maxWidth: "45px",
  color: "#fff",
  borderColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
    color: "black",
    borderColor: "#fff",
  },
}));

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    background: "#222222",
    color: "#fff",
    boxShadow: "0px 0px 20px rgb(0, 0, 0, 1)",
  },
  "& > .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    filter: "brightness(0.6)",
  },
}));

export const Caret = styled("div")`
  position: absolute;
  top: -8px;
  left: calc(50% - 8px);
  border-style: solid;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent #fff transparent;
`;
