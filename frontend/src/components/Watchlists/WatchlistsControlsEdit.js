import React from "react";

import { Check, Clear, DeleteForever, Edit, OpenInNew } from "@mui/icons-material";

import ConfirmDialog from "../Utility/ConfirmDialog";
import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";
import { ErrorPopper } from "../Utility/Errors";

const WatchlistsControlsEdit = ({
  showControls,
  expandedAccordions,
  editList,
  listID,
  handleDeleteDialog,
  handleDialogConfirm,
  openDialog,
  handleWatchlistOpen,
  handleWatchlistEdit,
  handleWatchlistCancel,
  handleWatchlistSave,
  watchlistSingle,
  confirmButtonRef,
  anchorEl,
  errorPopperOpen,
  closeErrorPopper,
  errorObject,
  fadeDuration,
}) => {
  // const [showControls, setShowControls] = useState(false);

  // useEffect(() => {
  //   if (expandedAccordions.includes(listID)) {
  //     setTimeout(() => {
  //       setShowControls(true);
  //     }, 200);
  //   } else {
  //     setShowControls(false);
  //   }
  // }, [expandedAccordions, listID]);

  return (
    showControls && (
      <div className={`${watchlistSingle ? "watchlist-single" : "watchlists"}__titles-controls-wrapper fade-in`}>
        {editList !== listID && (
          <StyledButton
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
          confirm={() => handleDialogConfirm(listID)}
          errorObject={errorObject}
        />
        {editList === listID ? (
          <>
            <StyledButton
              id='watchlistCancelBtn'
              type='button'
              variant='outlined'
              sx={{ m: "1rem 1rem 1rem 0" }}
              onClick={handleWatchlistCancel}
            >
              <Clear />
            </StyledButton>
            <StyledButton
              id='watchlistSaveBtn'
              ref={confirmButtonRef}
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
            id='watchlistOpenBtn'
            type='button'
            variant='outlined'
            sx={{ m: "1rem 2rem 1rem 0" }}
            onClick={() => handleWatchlistOpen(listID)}
          >
            <OpenInNew />
          </StyledButton>
        )}
        <ErrorPopper
          anchorEl={anchorEl}
          open={errorPopperOpen}
          onClose={closeErrorPopper}
          errorText={errorObject?.errorText}
          errorCode={errorObject?.errorCode}
          color='black'
          fadeDuration={fadeDuration}
        />
      </div>
    )
  );
};

export default WatchlistsControlsEdit;
