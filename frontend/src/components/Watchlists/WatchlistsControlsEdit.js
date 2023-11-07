import React, { useState } from "react";

import { Check, Clear, DeleteForever, Edit, OpenInNew } from "@mui/icons-material";

import ConfirmDialog from "../Utility/ConfirmDialog";
import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";
import { deleteWatchlist } from "../../services/CrudService";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWatchlistContext } from "../../hooks/useWatchlistContext";

const WatchlistsControlsEdit = ({
  user,
  showControls,
  expandedAccordions,
  setExpandedAccordions,
  editList,
  listID,
  handleWatchlistOpen,
  handleWatchlistEdit,
  handleWatchlistCancel,
  handleWatchlistSave,
  watchlistSingle,
  confirmBtnRef,
  errorObject,
  setErrorObject,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();

  const handleDeleteDialog = (listID) => {
    setOpenDialog(listID ? listID : false);
    setTimeout(() => {
      setErrorObject(null);
    }, 300);
  };

  const handleDeleteConfirm = async (listID) => {
    try {
      await deleteWatchlist(user.token, listID, dispatchWatchlists, dispatchUser);
      if (expandedAccordions.includes(listID)) {
        setTimeout(() => {
          setExpandedAccordions(expandedAccordions.filter((a) => a !== listID));
        }, 300);
      }
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      } else {
        setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
      }
    }
  };

  return (
    showControls && (
      <div className={`${watchlistSingle ? "watchlist-single" : "watchlists"}__titles-controls-wrapper fade-in`}>
        {editList !== listID && (
          <StyledButton
            aria-label='Delete watchlist'
            id='watchlistDeleteBtn'
            type='button'
            variant='outlined'
            sx={{ m: "1rem 1rem 1rem 0", justifySelf: "flex-start" }}
            onClick={() => handleDeleteDialog(listID)}
          >
            <DeleteForever />
          </StyledButton>
        )}
        <ConfirmDialog
          open={openDialog === listID}
          handleClose={() => handleDeleteDialog()}
          title={"Delete this list?"}
          confirm={() => handleDeleteConfirm(listID)}
          errorObject={errorObject}
        />
        {editList === listID ? (
          <>
            <StyledButton
              aria-label='Cancel watchlist changes'
              id='watchlistCancelBtn'
              type='button'
              variant='outlined'
              sx={{ m: "1rem 1rem 1rem 0" }}
              onClick={handleWatchlistCancel}
            >
              <Clear />
            </StyledButton>
            <StyledButton
              aria-label='Confirm watchlist changes'
              id='watchlistSaveBtn'
              ref={confirmBtnRef}
              type='button'
              variant='outlined'
              sx={{ m: "1rem 1rem 1rem 0" }}
              onClick={() => handleWatchlistSave(listID)}
            >
              <Check />
            </StyledButton>
          </>
        ) : (
          <StyledButton
            aria-label='Edit watchlist'
            id='watchlistEditBtn'
            type='button'
            variant='outlined'
            sx={{ m: "1rem 1rem 1rem 0" }}
            onClick={() => handleWatchlistEdit(listID)}
          >
            <Edit />
          </StyledButton>
        )}
        {handleWatchlistOpen && (
          <StyledButton
            aria-label='View watchlist on separate page'
            id='watchlistOpenBtn'
            type='button'
            variant='outlined'
            sx={{ m: "1rem 2rem 1rem 0" }}
            onClick={() => handleWatchlistOpen(listID)}
          >
            <OpenInNew />
          </StyledButton>
        )}
      </div>
    )
  );
};

export default WatchlistsControlsEdit;
