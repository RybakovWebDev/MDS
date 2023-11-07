import React, { useRef, useState } from "react";

import { Divider } from "@mui/material";

import WatchlistTitlesList from "./WatchlistTitlesList";
import WatchlistsControlsEdit from "./WatchlistsControlsEdit";
import WatchlistsControlsView from "./WatchlistsControlsView";
import { StyledWatchlistNameTextfield } from "../Utility/StyledComponents/StyledComponentsWatchlist";
import { WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";

import { useWatchlistContext } from "../../hooks/useWatchlistContext";
import { patchWatchlist } from "../../services/CrudService";
import { useAuthContext } from "../../hooks/useAuthContext";

const WatchlistSingle = ({ user, watchlist, getMovieData, isTabletOrMobile }) => {
  const { watchlists, dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();
  const currentWatchlist = watchlist ? watchlists.filter((w) => w._id === watchlist._id)[0] : null;

  const [editList, setEditList] = useState("");
  const [listName, setListName] = useState(currentWatchlist?.name);
  const [listCopy, setListCopy] = useState({});
  const [listView, setListView] = useState("large");
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorObject, setErrorObject] = useState({});
  const [errorPopperOpen, setErrorPopperOpen] = useState(false);
  const [popperFadeDuration, setPopperFadeDuration] = useState(350);

  const confirmBtnRef = useRef();

  const triggerErrorPopper = (target) => {
    setAnchorEl(target);
    setErrorPopperOpen(true);
  };

  const closeErrorPopper = () => {
    setErrorPopperOpen(false);
    setTimeout(() => {
      setAnchorEl(null);
      setErrorObject(null);
    }, 300);
  };

  const handleWatchlistEdit = (listID) => {
    setListCopy(JSON.parse(JSON.stringify(currentWatchlist)));
    setEditList(listID);
    setListName(currentWatchlist.name);
    if (listView === "cells") setListView("large");
  };

  const handleWatchlistNameInput = (e) => {
    setListName(e.currentTarget.value);
  };

  const handleWatchlistTitleRemove = (listID, titleID) => {
    currentWatchlist.titles = currentWatchlist.titles.filter((t) => t.imdbID !== titleID);
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: currentWatchlist });
  };

  const handleWatchlistCancel = () => {
    setPopperFadeDuration(1);
    closeErrorPopper();
    setTimeout(
      () => {
        let currentWatchlist = listCopy;
        setListName(listCopy.name);
        dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: currentWatchlist });
        setEditList("");
        setPopperFadeDuration(350);
      },
      errorPopperOpen ? 100 : 0
    );
  };

  const handleWatchlistSave = async (listID) => {
    try {
      const update = { name: listName, titles: currentWatchlist.titles };
      await patchWatchlist(user ? user.token : "", listID, update, dispatchWatchlists, dispatchUser);
      setEditList("");
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      } else {
        setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
      }
      triggerErrorPopper(confirmBtnRef.current);
    }
  };

  const listViewHandler = (e) => {
    const id = e.currentTarget.id;
    if (id === "listViewLargeBtn") setListView("large");
    if (id === "listViewSmallBtn") setListView("small");
    if (id === "listViewCellsBtn") setListView("cells");
  };

  return (
    <article className='watchlist-single-wrapper fade-in'>
      {currentWatchlist ? (
        <>
          <div className='watchlist-single__name-wrapper'>
            <StyledWatchlistNameTextfield
              id='watchlistNameInput'
              variant='standard'
              multiline
              value={listName ? listName : currentWatchlist.name}
              onChange={handleWatchlistNameInput}
              disabled={!editList}
              inputProps={{ readOnly: !editList, maxLength: 120 }}
            />
          </div>
          <div className='watchlist-single__controls-wrapper'>
            {user && user.id === currentWatchlist?.author && (
              <WatchlistsControlsEdit
                user={user}
                showControls={true}
                editList={editList}
                handleWatchlistOpen={false}
                handleWatchlistEdit={handleWatchlistEdit}
                handleWatchlistCancel={handleWatchlistCancel}
                handleWatchlistSave={handleWatchlistSave}
                listID={currentWatchlist._id}
                watchlistSingle={true}
                confirmBtnRef={confirmBtnRef}
                anchorEl={anchorEl}
                errorPopperOpen={errorPopperOpen}
                closeErrorPopper={closeErrorPopper}
                errorObject={errorObject}
                setErrorObject={setErrorObject}
                fadeDuration={popperFadeDuration}
                color='black'
              />
            )}
            <div>
              <WatchlistsControlsView
                listViewHandler={listViewHandler}
                listView={listView}
                cellsView={true}
                editList={editList}
                isTabletOrMobile={isTabletOrMobile}
              />
            </div>
          </div>
          <div className={listView === "cells" ? "watchlist-single--view-cells" : ""}>
            {listView !== "cells" && <Divider sx={{ m: "0.5rem 0 0.5rem 0", backgroundColor: "#595959" }} />}
            <WatchlistTitlesList
              currentWatchlist={currentWatchlist}
              isTabletOrMobile={isTabletOrMobile}
              listView={listView}
              editList={editList}
              getMovieData={getMovieData}
              handleWatchlistTitleRemove={handleWatchlistTitleRemove}
            />
          </div>
        </>
      ) : (
        <WhiteSpinner />
      )}
    </article>
  );
};

export default WatchlistSingle;
