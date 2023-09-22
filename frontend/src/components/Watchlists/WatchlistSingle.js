import React, { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Divider } from "@mui/material";
import { Clear } from "@mui/icons-material";

import WatchlistsControlsEdit from "./WatchlistsControlsEdit";
import WatchlistsControlsView from "./WatchlistsControlsView";
import SortableTitleItem from "./SortableTitleItem";
import {
  StyledWatchlistNameTextfield,
  StyledWatchlistTitleRemoveButton,
  StyledWatchlistTitleText,
} from "../Utility/StyledComponents/StyledComponentsWatchlist";
import { WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";

import { useWatchlistContext } from "../../hooks/useWatchlistContext";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { deleteWatchlist, patchWatchlist } from "../../services/CrudService";
import { useAuthContext } from "../../hooks/useAuthContext";

const WatchlistSingle = ({ props, user, watchlist }) => {
  const { watchlists, dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();
  const currentWatchlist = watchlist ? watchlists.filter((w) => w._id === watchlist._id)[0] : null;

  const [editList, setEditList] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [listName, setListName] = useState(currentWatchlist?.name);
  const [listCopy, setListCopy] = useState({});
  const [listView, setListView] = useState("large");

  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleWatchlistEdit = (listID) => {
    setListCopy(JSON.parse(JSON.stringify(currentWatchlist)));
    setEditList(listID);
    setListName(currentWatchlist.name);
    setListView("large");
  };

  const handleWatchlistNameInput = (e) => {
    setListName(e.currentTarget.value);
  };

  const handleWatchlistTitleRemove = (listID, titleID) => {
    currentWatchlist.titles = currentWatchlist.titles.filter((t) => t.imdbID !== titleID);
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: currentWatchlist });
  };

  const handleWatchlistCancel = () => {
    let currentWatchlist = listCopy;
    setListName(listCopy.name);
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: currentWatchlist });
    setEditList("");
  };

  const handleWatchlistSave = async (listID) => {
    const update = { name: listName, titles: currentWatchlist.titles };
    patchWatchlist(user ? user.token : "", listID, update, dispatchWatchlists, dispatchUser);
    setEditList("");
  };

  const handleDeleteDialog = (listID) => {
    setOpenDialog(listID ? listID : false);
  };

  const handleDialogConfirm = (listID) => {
    setOpenDialog(false);
    deleteWatchlist(user ? user.token : "", listID, dispatchWatchlists, dispatchUser);
    navigate(`/profile`);
  };

  const handletTitleDndEnd = (e) => {
    const { active, over } = e;
    if (!over) return;
    const target = active.id;
    const startPosition = active.data.current.sortable.index;

    const title = currentWatchlist.titles.find((t) => t.imdbID === target);

    if (target !== over.id) {
      let endPosition;
      endPosition = currentWatchlist.titles.findIndex((t) => t.imdbID === over.id);

      currentWatchlist.titles.splice(startPosition, 1);
      currentWatchlist.titles.splice(endPosition, 0, title);

      dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: currentWatchlist });
    }
  };

  const listViewHandler = (e) => {
    const id = e.currentTarget.id;
    if (id === "listViewLargeBtn") setListView("large");
    if (id === "listViewSmallBtn") setListView("small");
    if (id === "listViewCellsBtn") setListView("cells");
  };

  const renderTitles = (l, listEdit) => {
    const titleContent = (el) => {
      return (
        <div
          className='watchlist-accordion__entry-content'
          onClick={() => {
            props.getMovieData(el.title, el.imdbID);
          }}
        >
          <div className={`watchlist-accordion__entry-img-cont-${listView}`}>
            <img src={el.poster} alt='Watchlist entry poster' />
          </div>
          {listView !== "cells" && (
            <StyledWatchlistTitleText>
              {el.title} <br /> {el.year}
            </StyledWatchlistTitleText>
          )}
        </div>
      );
    };

    return (
      <DndContext
        sensors={sensors}
        onDragEnd={handletTitleDndEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext items={l.titles.map((t) => t.imdbID)} strategy={verticalListSortingStrategy}>
          <TransitionGroup component={null}>
            {l.titles.map((el) => {
              const nodeRef = createRef();
              return (
                <CSSTransition key={el.imdbID} timeout={300} classNames='item' nodeRef={nodeRef}>
                  <SortableTitleItem
                    key={el.imdbID}
                    id={el.imdbID}
                    listID={l._id}
                    listEdit={editList}
                    nodeRef={nodeRef}
                    listViewCells={listView === "cells"}
                  >
                    <div className='watchlist-accordion__entry'>
                      <Link
                        to='/'
                        className={`${editList ? "link-no-hover" : ""}${
                          listView === "cells" && !editList ? "link-no-hover-cells" : ""
                        }`}
                        onClick={(e) => {
                          listEdit && e.preventDefault();
                        }}
                      >
                        {titleContent(el)}
                      </Link>

                      {editList && (
                        <StyledWatchlistTitleRemoveButton
                          className='fade-in'
                          id='watchlistTitleRemoveBtn'
                          onClick={() => handleWatchlistTitleRemove(l._id, el.imdbID)}
                        >
                          <Clear />
                        </StyledWatchlistTitleRemoveButton>
                      )}
                    </div>
                  </SortableTitleItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </SortableContext>
      </DndContext>
    );
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
              fullWidth
              value={listName ? listName : currentWatchlist.name}
              onChange={handleWatchlistNameInput}
              disabled={!editList}
              inputProps={{ readOnly: !editList, maxLength: 500 }}
            />
            {user && (
              <WatchlistsControlsEdit
                showControls={true}
                editList={editList}
                handleDeleteDialog={handleDeleteDialog}
                handleDialogConfirm={handleDialogConfirm}
                handleWatchlistOpen={false}
                handleWatchlistEdit={handleWatchlistEdit}
                handleWatchlistCancel={handleWatchlistCancel}
                handleWatchlistSave={handleWatchlistSave}
                listID={currentWatchlist._id}
                openDialog={openDialog}
                watchlistSingle={true}
              />
            )}
            <WatchlistsControlsView listViewHandler={listViewHandler} listView={listView} cellsView={true} />
          </div>
          <div className={listView === "cells" ? "watchlist-single--view-cells" : ""}>
            {listView !== "cells" && <Divider sx={{ m: "0.5rem 0 0.5rem 0", backgroundColor: "#595959" }} />}
            {renderTitles(currentWatchlist)}
          </div>
        </>
      ) : (
        <WhiteSpinner />
      )}
    </article>
  );
};

export default WatchlistSingle;
