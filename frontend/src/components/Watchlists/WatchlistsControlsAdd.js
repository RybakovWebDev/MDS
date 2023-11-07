import React, { useRef } from "react";

import { Add } from "@mui/icons-material";

import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";

import { postWatchlist } from "../../services/CrudService";
import { useWatchlistContext } from "../../hooks/useWatchlistContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const WatchlistsControlsAdd = ({ user, setErrorObject, triggerErrorPopper }) => {
  const { dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();

  const addBtnRef = useRef();

  const handleWatchlistNew = async () => {
    try {
      await postWatchlist(user.token, user.id, dispatchWatchlists, dispatchUser);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      } else {
        setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
      }
      triggerErrorPopper(addBtnRef.current);
    }
  };
  return (
    <div className='watchlists__controls-wrapper'>
      <StyledButton ref={addBtnRef} id='listAddBtn' variant='outlined' onClick={handleWatchlistNew}>
        <Add />
      </StyledButton>
    </div>
  );
};

export default WatchlistsControlsAdd;
