import React from "react";

import { Check, Clear, DeleteForever, Edit, OpenInNew } from "@mui/icons-material";

import ConfirmDialog from "../Utility/ConfirmDialog";
import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";

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
            id='watchlistEditBtn'
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
