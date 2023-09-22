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
  const [isUploading, setIsUploading] = useState(false);

  const { dispatchUser } = useAuthContext();

  const inputRef = useRef();

  const handleProfileInfo = async (e) => {
    const target = e.currentTarget;
    const id = target.id;
    const value = target.value;

    if (id === "profileInfoNameInput") {
      setName(value);
    }
    if (id === "profileInfoImageChangeInput") {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
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
    handleErrorPopper();
  };

  const handleProfileInfoEditConfirm = async (e) => {
    try {
      setName(name.trim());
      inputRef.current.value = null;
      updateUser(user.token, user.id, { name: name }, dispatchUser);
      if (file) {
        setIsUploading(true);
        const newImage = await uploadImage(user.token, user.id, file);
        inputRef.current.value = null;
        updateUser(user.token, user.id, { image: newImage?.location ? newImage?.location : "" }, dispatchUser);
        setIsUploading(false);
      }
      if (!image && user.image) {
        const fileName = user.image.split("/").slice(-1)[0];
        const deleteImageResult = await deleteImage(user.token, user.id, fileName);
        deleteImageResult.message =
          "File deleted successfully" && updateUser(user.token, user.id, { image: "" }, dispatchUser);
      }
      setEdit(false);
      handleErrorPopper();
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      setFile(null);
      setImage(user.image);
      setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      setAnchorEl(e.target);
      setErrorPopperOpen(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleErrorPopper = () => {
    setErrorPopperOpen(false);
    setTimeout(() => {
      setAnchorEl(null);
      setErrorObject(null);
    }, 300);
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
            title={<Typography sx={{ fontSize: "12px" }}>File size limit: 2MB. PNG or JPG</Typography>}
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
              disabled={isUploading}
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
                accept='image/png, image/jpeg'
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
              disabled={isUploading}
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
          {isUploading && <WhiteSpinner />}
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
          {edit ? (
            <div className='profile__personal-info-controls-wrapper'>
              <StyledButtonSmall
                className='fade-in'
                id='profileInfoEditCancelBtn'
                variant='outlined'
                disabled={isUploading}
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
                variant='outlined'
                disabled={isShaking || isUploading}
                onClick={handleProfileInfoEditConfirm}
              >
                <Check />
              </StyledButtonSmall>
              <ErrorPopper
                anchorEl={anchorEl}
                open={errorPopperOpen}
                onClose={handleErrorPopper}
                errorText={errorObject?.errorText}
                errorCode={errorObject?.errorCode}
                color='black'
              />
            </div>
          ) : (
            <StyledButton className='fade-in' id='profileInfoEditBtn' variant='outlined' onClick={handleProfileInfo}>
              <Edit />
            </StyledButton>
          )}
        </div>
        <Typography variant='h6' sx={{ fontWeight: "300", fontFamily: "Roboto" }}>{`Member since ${user.date.slice(
          0,
          4
        )}`}</Typography>
      </div>
      {edit && <ProfileDeletion user={user} />}
    </article>
  );
};

export default ProfileInfo;
