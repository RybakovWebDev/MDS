import { useState } from "react";

import { DeleteForever } from "@mui/icons-material";

import ConfirmDialog from "../Utility/ConfirmDialog";
import { deleteUser } from "../../services/CrudService";
import { useAuthContext } from "../../hooks/useAuthContext";

import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";

const ProfileDeletion = ({ user }) => {
  const [profileDeleteDialogOpen, setProfileDeleteDialogOpen] = useState(false);

  const { dispatchUser } = useAuthContext();

  const handleProfileDeleteDialog = () => {
    setProfileDeleteDialogOpen(!profileDeleteDialogOpen);
  };

  const handleProfileDeletion = () => {
    deleteUser(user.token, user.id, dispatchUser);
  };

  return (
    <div className='profile__personal-info-delete-wrapper'>
      <StyledButton
        className='fade-in'
        id='profileInfoEditBtn'
        variant='outlined'
        color='error'
        onClick={handleProfileDeleteDialog}
      >
        <DeleteForever color='error' />
      </StyledButton>
      <ConfirmDialog
        open={profileDeleteDialogOpen}
        handleClose={handleProfileDeleteDialog}
        title={"Are you sure you want to delete your profile?"}
        text={"WARNING: ALL DATA WILL BE DELETED. THIS ACTION IS IRREVERSIBLE!"}
        fontSize={"22px"}
        fontWeight={800}
        confirm={handleProfileDeletion}
        delayMS={5000}
      />
    </div>
  );
};

export default ProfileDeletion;
