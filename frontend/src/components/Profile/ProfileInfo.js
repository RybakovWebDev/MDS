import { useEffect, useRef, useState } from "react";

import { Check, Clear, Edit } from "@mui/icons-material";
import { Fade, Tooltip, Typography } from "@mui/material";

import ProfileDeletion from "./ProfileDeletion";
import { updateUser } from "../../services/CrudService";
import { deleteImage, uploadImage } from "../../services/S3Service";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ErrorPopper } from "../Utility/Errors";
import { btnShakeAnimation } from "../../utilities/utilities";
import {
  StyledProfileImageBackdrop,
  StyledProfileImageButton,
  StyledProfileNameTextfield,
} from "../Utility/StyledComponents/StyledComponentsProfile";
import { StyledButton, StyledButtonSmall, WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";
import heic2any from "heic2any";

const ProfileInfo = ({ user, personPlaceholder, isTabletOrMobile }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [file, setFile] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorObject, setErrorObject] = useState({});
  const [errorPopperOpen, setErrorPopperOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [waitingForBackend, setWaitingForBackend] = useState(false);

  const { dispatchUser } = useAuthContext();

  const inputRef = useRef();
  const confirmButtonRef = useRef();

  const triggerErrorPopper = (target) => {
    setImage(user.image);
    setAnchorEl(target);
    setErrorPopperOpen(true);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    console.error(errorObject?.errorText, " Error code: ", errorObject?.errorCode);
  };

  const closeErrorPopper = () => {
    setErrorPopperOpen(false);
    setTimeout(() => {
      setAnchorEl(null);
      setErrorObject(null);
    }, 300);
  };

  const handleProfileInfo = async (e) => {
    const target = e.currentTarget;
    const id = target.id;
    const value = target.value;

    if (id === "profileInfoNameInput") {
      setName(value);
    }

    if (id === "profileInfoImageChangeInput") {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result;
          const maxSize = 5 * 1024 * 1024;
          if (arrayBuffer.byteLength > maxSize) {
            setErrorObject({ errorText: "File size too large! Limit is 5MB.", errorCode: "413" });
            triggerErrorPopper(confirmButtonRef.current);
            e.target.value = null;
            return;
          }
          const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
          const validExtensions = ["jpg", "jpeg", "png", "heic"];
          if (!validExtensions.includes(fileExtension)) {
            setErrorObject({
              errorText: "Invalid file type! Only .jpg, .png and .heic are allowed.",
              errorCode: "415",
            });

            triggerErrorPopper(confirmButtonRef.current);
            e.target.value = null;
            return;
          }
          if (fileExtension === "heic") {
            const convertedBlob = await heic2any({
              blob: selectedFile,
              toType: "image/jpeg",
              quality: 0.5,
            });
            setFile(new File([convertedBlob], selectedFile.name.replace(/\..+$/, ".jpeg"), { type: "image/jpeg" }));
            setImage(URL.createObjectURL(convertedBlob));
          } else {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
          }
          e.target.value = null;
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }

    if (id === "profileInfoImageRemoveBtn") {
      setImage("");
      setFile(null);
      inputRef.current.value = null;
    }

    if (id === "profileInfoEditBtn") {
      setEdit(true);
    }
  };

  const handleProfileInfoEditCancel = (e) => {
    setEdit(false);
    setName(user.name);
    setImage(user.image);
    inputRef.current.value = null;
    closeErrorPopper();
  };

  const handleProfileInfoEditConfirm = async (e) => {
    try {
      setName(name.trim());
      inputRef.current.value = null;
      await updateUser(user.token, user.id, { name: name }, dispatchUser);
      if (file) {
        setWaitingForBackend(true);
        const newImage = await uploadImage(user.token, user.id, file);
        inputRef.current.value = null;
        await updateUser(user.token, user.id, { image: newImage?.location ? newImage?.location : "" }, dispatchUser);
        setWaitingForBackend(false);
      }
      if (!image && user.image) {
        setWaitingForBackend(true);
        const fileName = user.image.split("/").slice(-1)[0];
        const deleteImageResult = await deleteImage(user.token, user.id, fileName);
        deleteImageResult.message =
          "File deleted successfully" && (await updateUser(user.token, user.id, { image: "" }, dispatchUser));
        setWaitingForBackend(false);
      }
      setEdit(false);
      closeErrorPopper();
    } catch (err) {
      console.error(err);
      setWaitingForBackend(false);
      setFile(null);
      setImage(user.image);
      if (err.response) {
        setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      } else {
        setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
      }
      triggerErrorPopper(confirmButtonRef.current);
    }
  };

  useEffect(() => {
    if (isTabletOrMobile) {
      setTooltipOpen(true);
    }
  }, [isTabletOrMobile]);

  return (
    <article className='profile__personal-info-wrapper'>
      <div className='profile__personal-image-wrapper'>
        <img
          className={`profile__personal-image${imageLoaded ? " fade-in" : " hidden"}`}
          src={image ? image : personPlaceholder}
          alt='Profile avatar'
          onLoad={() => setImageLoaded(true)}
        />
        <StyledProfileImageBackdrop open={edit}>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            title={<Typography sx={{ fontSize: "12px" }}>File size limit: 5MB. JPG/PNG/HEIC</Typography>}
            open={tooltipOpen && edit}
            onOpen={() => setTooltipOpen(true)}
            onClose={() => !isTabletOrMobile && setTooltipOpen(false)}
            componentsProps={{
              popper: {
                sx: {
                  zIndex: "1000",
                },
              },
            }}
          >
            <StyledProfileImageButton
              id='profileInfoImageChangeBtn'
              variant='contained'
              onClick={handleProfileInfo}
              component='label'
              disabled={waitingForBackend}
              sx={{
                animation: isShaking ? `${btnShakeAnimation} 0.5s` : "none",
                margin: `0 0 ${isTabletOrMobile ? "3" : "1"}rem 0`,
              }}
            >
              Upload new image
              <input
                id='profileInfoImageChangeInput'
                hidden
                name='fileInput'
                accept='image/png, image/jpeg, image/jpg, image/heic'
                type='file'
                onChange={handleProfileInfo}
                ref={inputRef}
              />
            </StyledProfileImageButton>
          </Tooltip>
          {image && (
            <StyledProfileImageButton
              id='profileInfoImageRemoveBtn'
              variant='contained'
              onClick={handleProfileInfo}
              size='small'
              disabled={waitingForBackend}
              sx={{
                position: "absolute",
                bottom: "0",
                margin: "0 0 10% 0",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              Remove image
            </StyledProfileImageButton>
          )}
          {waitingForBackend && <WhiteSpinner />}
        </StyledProfileImageBackdrop>
      </div>
      <div className='profile__personal-info'>
        <div className='profile__personal-info-name-wrapper'>
          <StyledProfileNameTextfield
            id='profileInfoNameInput'
            variant='standard'
            value={name}
            onChange={handleProfileInfo}
            disabled={!edit}
            inputProps={{ readOnly: !edit, maxLength: 19 }}
          />
        </div>
        <Typography
          sx={{ fontSize: "18px", fontWeight: "300", fontFamily: "Inter, Roboto" }}
        >{`Member since ${user.date.slice(0, 4)}`}</Typography>
      </div>

      {edit ? (
        <div className='profile__personal-info-controls-wrapper'>
          <ProfileDeletion user={user} />
          <StyledButtonSmall
            className='fade-in'
            id='profileInfoEditCancelBtn'
            variant='outlined'
            disabled={waitingForBackend}
            sx={{
              m: "0 1.5rem 0 0",
            }}
            onClick={handleProfileInfoEditCancel}
          >
            <Clear />
          </StyledButtonSmall>
          <StyledButtonSmall
            className='fade-in'
            id='profileInfoEditConfirmBtn'
            ref={confirmButtonRef}
            variant='outlined'
            disabled={isShaking || waitingForBackend}
            onClick={handleProfileInfoEditConfirm}
          >
            <Check />
          </StyledButtonSmall>
          <ErrorPopper
            anchorEl={anchorEl}
            open={errorPopperOpen}
            onClose={closeErrorPopper}
            errorText={errorObject?.errorText}
            errorCode={errorObject?.errorCode}
            color='black'
            isTabletOrMobile={isTabletOrMobile}
          />
        </div>
      ) : (
        <div className='profile__personal-info-controls-wrapper'>
          <StyledButton className='fade-in' id='profileInfoEditBtn' variant='outlined' onClick={handleProfileInfo}>
            <Edit />
          </StyledButton>
        </div>
      )}
    </article>
  );
};

export default ProfileInfo;
