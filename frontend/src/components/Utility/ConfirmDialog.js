import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/joy";
import { StyledButton } from "./StyledComponents/StyledComponentsUtility";
import { ErrorMessage } from "./Errors";

const ConfirmDialog = ({ open, handleClose, title, text, fontSize, fontWeight, confirm, delayMS, errorObject }) => {
  const [confirmDisabled, setConfirmDisabled] = useState(false);
  const [countdown, setCountdown] = useState(delayMS ? delayMS / 1000 : null);

  useEffect(() => {
    let countdownInterval;
    if (delayMS) {
      setConfirmDisabled(true);
      setCountdown(delayMS / 1000);
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setTimeout(() => {
        setConfirmDisabled(false);
        clearInterval(countdownInterval);
      }, delayMS);
    }
    return () => clearInterval(countdownInterval);
  }, [delayMS]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog'
      aria-describedby='confirmation-alert-dialog'
      maxWidth='sm'
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          background: "#222222",
          color: "#fff",
          boxShadow: "0px 0px 20px rgb(0, 0, 0, 1)",
        },
        "& > .MuiBackdrop-root": {
          backdropFilter: "blur(5px)",
          filter: "brightness(0.6)",
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      {text && <Divider />}

      {errorObject && (
        <DialogContent>
          <DialogContentText component='div' className='fade-in' color='#fff'>
            <ErrorMessage errorText={errorObject.errorText} errorCode={errorObject.errorCode} fontSize={"18px"} />
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <StyledButton variant='outlined' onClick={handleClose} sx={{ width: "6rem" }}>
          Cancel
        </StyledButton>
        <StyledButton
          id='dialogConfirmBtn'
          variant='outlined'
          disabled={confirmDisabled}
          onClick={confirm}
          autoFocus
          sx={{ width: "6rem", "&.Mui-disabled": { color: "#fff" } }}
        >
          {confirmDisabled && countdown ? `${countdown}` : "Confirm"}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
