import React from "react";

import { Add } from "@mui/icons-material";
import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";

const WatchlistsControlsAdd = ({ handleWatchlistNew }) => {
  return (
    <div className='watchlists__controls-wrapper'>
      <StyledButton id='listAddBtn' variant='outlined' onClick={handleWatchlistNew}>
        <Add />
      </StyledButton>
    </div>
  );
};

export default WatchlistsControlsAdd;
