// ErrorComponent.js
import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Fade, Typography } from "@mui/material";
import { Caret } from "./StyledComponents/StyledComponentsUtility";

export const ErrorPopper = ({ anchorEl, open, onClose, errorText, errorCode, color }) => {
  const errorPopperID = open ? "errorPopper" : undefined;

  return (
    <Popper
      id={errorPopperID}
      open={open}
      anchorEl={anchorEl}
      placement='bottom'
      disablePortal
      transition
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
      sx={{ zIndex: 100 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box
            sx={{
              margin: "1rem 1rem 0 1rem",
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <Caret sx={{ margin: "1rem 0 0 0" }} />
            <IconButton aria-label='close' onClick={onClose}>
              <CloseIcon />
            </IconButton>
            {errorText && (
              <Typography sx={{ mr: "0.5rem", color: color ? color : "#fff" }}>
                There's been an error! 😥
                <br />
                {errorText ? ` ${errorText};` : " No error message provided."}
                {errorCode ? ` Error code: ${errorCode}.` : " No error code provided."}
              </Typography>
            )}
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export const ErrorMessage = (props) => {
  const { noNotification, fontSize, errorText, errorCode, color } = props;
  return (
    <section className='error-parent-cont'>
      <div className='error-message'>
        <Typography sx={{ color: color ? color : "#fff", fontSize: fontSize ? fontSize : "22px" }}>
          {!noNotification && `${"There's been an error! 😥"}`}
          <br />
          {errorText && ` ${errorText}`}
          {errorCode && ` Error code: ${errorCode}.`}
        </Typography>
      </div>
    </section>
  );
};
