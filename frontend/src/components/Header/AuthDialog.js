import { useEffect, useState } from "react";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/joy";
import { CircularProgress, Fade, FormControlLabel, FormGroup, Tooltip, Typography } from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import {
  StyledAuthDialog,
  StyledAuthDialogActions,
  StyledAuthTextfield,
} from "../Utility/StyledComponents/StyledComponentsHeader";
import { StyledButton, StyledSwitch } from "../Utility/StyledComponents/StyledComponentsUtility";

const createAuthError = (error, field) => {
  if (error) {
    const lowerCaseError = error.toLowerCase();
    const errorMessages = lowerCaseError.split(";").filter((message) => message.includes(field));
    const hasError = errorMessages.length > 0;
    const formattedMessages = errorMessages.map(
      (message) => message.trim().charAt(0).toUpperCase() + message.trim().slice(1)
    );
    return { status: hasError, message: hasError && formattedMessages.join("; ") };
  }
  return {};
};

const renderError = (error) => {
  if (error && !/email|Email|password|Password/.test(error)) {
    return <Typography>Error: {error}</Typography>;
  }
  return null;
};

const AuthDialog = ({ open, authDialogHandler, authSwitch, setAuthSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authErrorEmail, setAuthErrorEmail] = useState({});
  const [authErrorPassword, setAuthErrorPassword] = useState({});
  const [buttonTooltip, setButtonTooltip] = useState(false);
  const { auth, isLoading, authError, clearError } = useAuth();

  const emptyFields = email === "" || password === "" || isLoading || password.length < 4;

  useEffect(() => {
    setAuthErrorEmail(createAuthError(authError, "email"));
    setAuthErrorPassword(createAuthError(authError, "password"));
  }, [authError]);

  useEffect(() => {
    if (!open) {
      clearError();
    }
  }, [clearError, open]);

  const authHandler = async (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    if (id === "authDialogEmailInput") {
      setEmail(value);
    }
    if (id === "authDialogPasswordInput") {
      setPassword(value);
    }

    if (id === "authDialogCancelBtn") {
      authDialogHandler();
      setEmail("");
      setPassword("");
    }
    if (id === "authDialogLoginBtn") {
      auth(email, password, true);
    }
    if (id === "authDialogSignUpBtn") {
      auth(email, password, false);
    }
  };

  const switchHandler = (e) => {
    setAuthSwitch(e.currentTarget.checked);
    clearError();
  };

  const handleTooltip = (e) => {
    setButtonTooltip(!buttonTooltip);
  };

  return (
    <StyledAuthDialog
      open={open}
      onClose={authDialogHandler}
      aria-labelledby='Authentication dialog'
      aria-describedby='alert-dialog-signup-signin'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='alert-dialog-title' sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ fontSize: "22px", fontWeight: "500" }}>Please authorize to continue</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <StyledAuthTextfield
          id='authDialogEmailInput'
          margin='dense'
          label='Email Address'
          type='email'
          fullWidth
          variant='outlined'
          InputLabelProps={{ sx: { color: "#fff" } }}
          InputProps={{ sx: { color: "#fff" } }}
          onChange={authHandler}
          error={authErrorEmail.status}
          helperText={authErrorEmail.message}
        />
        <StyledAuthTextfield
          id='authDialogPasswordInput'
          margin='dense'
          label='Password'
          placeholder={authSwitch ? "Minimum 4 characters" : ""}
          type='password'
          fullWidth
          variant='outlined'
          InputLabelProps={{ sx: { color: "#fff" } }}
          InputProps={{ sx: { color: "#fff" } }}
          onChange={authHandler}
          error={authErrorPassword.status}
          helperText={authErrorPassword.message}
        />
        {renderError(authError)}
      </DialogContent>

      <StyledAuthDialogActions>
        <FormGroup>
          <FormControlLabel
            label={<Typography sx={{ fontSize: "20px" }}>{authSwitch ? "Sign up" : "Login"}</Typography>}
            labelPlacement='end'
            control={<StyledSwitch onChange={switchHandler} />}
          />
        </FormGroup>
        <div className='auth-dialog__buttons'>
          {isLoading && <CircularProgress size={24} sx={{ marginRight: "1rem", color: "white" }} />}
          <StyledButton
            aria-label='Cancel'
            id='authDialogCancelBtn'
            variant='outlined'
            onClick={authHandler}
            sx={{ marginRight: "1rem", width: "6rem" }}
          >
            Cancel
          </StyledButton>

          <Tooltip
            open={buttonTooltip && emptyFields}
            onMouseEnter={handleTooltip}
            onMouseLeave={handleTooltip}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title='Fill out the required fields'
          >
            <div>
              <StyledButton
                aria-label={authSwitch ? "Sign up" : "Login"}
                id={authSwitch ? "authDialogSignUpBtn" : "authDialogLoginBtn"}
                variant='outlined'
                disabled={emptyFields}
                onClick={authHandler}
                sx={{ width: "6rem", "&.Mui-disabled": { color: "hsl(0, 0%, 50%)" } }}
              >
                {authSwitch ? "Sign up" : "Login"}
              </StyledButton>
            </div>
          </Tooltip>
        </div>
      </StyledAuthDialogActions>
    </StyledAuthDialog>
  );
};

export default AuthDialog;
