import React, { createRef, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/joy";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, Fade } from "@mui/material";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";

import WatchlistsControlsAdd from "./WatchlistsControlsAdd";
import WatchlistsControlsEdit from "./WatchlistsControlsEdit";
import SortableAccordionItem from "./SortableAccordionItem";
import { deleteWatchlist, patchWatchlist, postWatchlist, updateUser } from "../../services/CrudService";

import WatchlistsControlsView from "./WatchlistsControlsView";
import WatchlistTitlesList from "./WatchlistTitlesList";
import { useWatchlistContext } from "../../hooks/useWatchlistContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  StyledAccordionDetailsWatchlist,
  StyledAccordionSummaryWatchlist,
  StyledWatchlistName,
  StyledWatchlistNameTextfield,
} from "../Utility/StyledComponents/StyledComponentsWatchlist";
import { WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";

const Watchlists = ({ props, userWatchlists, user, isTabletOrMobile }) => {
  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [editList, setEditList] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [listName, setListName] = useState("");
  const [listCopy, setListCopy] = useState({});
  const [listView, setListView] = useState("large");
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorObject, setErrorObject] = useState({});
  const [errorPopperOpen, setErrorPopperOpen] = useState(false);
  const [popperFadeDuration, setPopperFadeDuration] = useState(350);

  const { isLoading, dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();
  const navigate = useNavigate();
  const confirmButtonRef = useRef();

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findListById = (listID) => {
    return userWatchlists.find((l) => l._id === listID);
  };

  const handleAccordionEdit = () => {
    if (editList) dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: listCopy });
    setEditList("");
    closeErrorPopper();
  };

  const handleAccordionExpandState = (listID) => {
    if (!expandedAccordions.includes(listID)) {
      setExpandedAccordions([...expandedAccordions, listID]);
    } else {
      setExpandedAccordions(expandedAccordions.filter((a) => a !== listID));
    }
  };

  const listViewHandler = (e) => {
    const id = e.currentTarget.id;
    if (id === "listViewLargeBtn") setListView("large");
    if (id === "listViewSmallBtn") setListView("small");
  };

  const handleDeleteDialog = (listID) => {
    setOpenDialog(listID ? listID : false);
    setTimeout(() => {
      setErrorObject(null);
    }, 300);
  };

  const handleDialogConfirm = async (listID) => {
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

  const handleWatchlistOpen = (listID) => {
    navigate(`/watchlist/${listID}`);
  };

  const handleWatchlistEdit = (listID) => {
    let selectedList = findListById(listID);
    setListCopy(JSON.parse(JSON.stringify(selectedList)));
    setEditList(listID);
    setListName(selectedList.name);
  };

  const handleWatchlistNameInput = (e) => {
    setListName(e.currentTarget.value);
  };

  const handleWatchlistTitleRemove = (listID, titleID) => {
    let selectedList = findListById(listID);
    selectedList.titles = selectedList.titles.filter((t) => t.imdbID !== titleID);
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: selectedList });
  };

  const handleWatchlistCancel = () => {
    setPopperFadeDuration(1);
    closeErrorPopper();
    setTimeout(
      () => {
        let selectedList = listCopy;
        dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: selectedList });
        setEditList("");
        setPopperFadeDuration(350);
      },
      errorPopperOpen ? 100 : 0
    );
  };

  const handleWatchlistSave = async (listID) => {
    let selectedList = findListById(listID);
    try {
      const update = { name: listName, titles: selectedList.titles };
      await patchWatchlist(user.token, listID, update, dispatchWatchlists, dispatchUser);

      setEditList("");
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      } else {
        setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
      }
      triggerErrorPopper(confirmButtonRef.current);
    }
  };

  const handleWatchlistNew = () => {
    try {
      postWatchlist(user.token, user.id, dispatchWatchlists, dispatchUser);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
      } else {
        setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
      }
      triggerErrorPopper(confirmButtonRef.current);
    }
  };

  const handleAccordionDndEnd = (e) => {
    const { active, over } = e;
    if (!over) return;
    const targetListID = active.id;
    const startPosition = active.data.current.sortable.index;

    let selectedList = findListById(targetListID);

    if (targetListID !== over.id) {
      let watchlistsCopy = userWatchlists;
      let endPosition = userWatchlists.findIndex((l) => l._id === over.id);
      watchlistsCopy.splice(startPosition, 1);
      watchlistsCopy.splice(endPosition, 0, selectedList);
      dispatchWatchlists({ type: "SET_WATCHLISTS", payload: watchlistsCopy });
      try {
        updateUser(user.token, user.id, { watchlistOrder: watchlistsCopy.map((w) => w._id) }, dispatchUser);
      } catch (err) {
        console.error(err);
        if (err.response) {
          setErrorObject({ errorText: err.response.data.error, errorCode: err.response.status });
        } else {
          setErrorObject({ errorText: err.message, errorCode: "NETWORK_ERROR" });
        }
        triggerErrorPopper(confirmButtonRef.current);
      }
    }
  };

  const renderAccordion = (l) => {
    const selectedForEdit = editList.includes(l._id);
    return (
      <Accordion
        className='watchlist-accordion__component'
        onChange={handleAccordionEdit}
        sx={{
          backgroundColor: "#222222",
        }}
      >
        <StyledAccordionSummaryWatchlist
          expandIcon={<ExpandMore sx={{ color: "white" }} />}
          aria-controls='panel1a-content'
          id='watchlistAccordionHeader'
          onClick={() => handleAccordionExpandState(l._id)}
        >
          {selectedForEdit ? (
            <StyledWatchlistNameTextfield
              id='watchlistNameInput'
              variant='standard'
              multiline
              value={listName ? listName : l.name}
              onClick={(e) => e.stopPropagation()}
              onChange={handleWatchlistNameInput}
              disabled={!editList}
              inputProps={{ readOnly: !editList, maxLength: 120 }}
              sx={{
                width: "95%",
                "& .MuiInputBase-input": {
                  fontSize: "18px",
                  lineHeight: "1.5",
                },
              }}
            />
          ) : (
            <Box sx={{ width: "95%", height: "auto", display: "flex", alignItems: "center" }}>
              <StyledWatchlistName>{l.name}</StyledWatchlistName>
            </Box>
          )}
        </StyledAccordionSummaryWatchlist>
        <StyledAccordionDetailsWatchlist className='watchlist-accordion__details'>
          {l.titles.length === 0 ? (
            <Typography sx={{ color: "white" }}>No titles yet </Typography>
          ) : (
            <ol className='watchlist-accordion__titles'>
              <WatchlistTitlesList
                currentWatchlist={l}
                isTabletOrMobile={isTabletOrMobile}
                listView={listView}
                editList={editList === l._id}
                getMovieData={props.getMovieData}
                handleWatchlistTitleRemove={handleWatchlistTitleRemove}
              />
            </ol>
          )}
          <WatchlistsControlsEdit
            expandedAccordions={expandedAccordions}
            editList={editList}
            showControls={expandedAccordions.includes(l._id)}
            handleDeleteDialog={handleDeleteDialog}
            handleDialogConfirm={handleDialogConfirm}
            handleWatchlistOpen={handleWatchlistOpen}
            handleWatchlistEdit={handleWatchlistEdit}
            handleWatchlistCancel={handleWatchlistCancel}
            handleWatchlistSave={handleWatchlistSave}
            listID={l._id}
            confirmButtonRef={confirmButtonRef}
            openDialog={openDialog}
            anchorEl={anchorEl}
            errorPopperOpen={errorPopperOpen}
            closeErrorPopper={closeErrorPopper}
            errorObject={errorObject}
            fadeDuration={popperFadeDuration}
            color='black'
          />
        </StyledAccordionDetailsWatchlist>
      </Accordion>
    );
  };

  const renderLists = () => {
    return (
      <ol>
        <DndContext
          sensors={sensors}
          onDragEnd={handleAccordionDndEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <SortableContext items={userWatchlists.map((l) => l._id)} strategy={verticalListSortingStrategy}>
            <TransitionGroup component={null}>
              {userWatchlists.map((l) => {
                const nodeRef = createRef();
                return (
                  <CSSTransition key={l._id} timeout={300} classNames='item' nodeRef={nodeRef}>
                    <SortableAccordionItem
                      key={l._id}
                      id={l._id}
                      expandedAccordions={expandedAccordions.length === 0}
                      nodeRef={nodeRef}
                      isTabletOrMobile={isTabletOrMobile}
                    >
                      {renderAccordion(l, nodeRef)}
                    </SortableAccordionItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </SortableContext>
        </DndContext>
      </ol>
    );
  };

  return isLoading ? (
    <WhiteSpinner sx={{ mt: "5rem" }} />
  ) : (
    <Fade in={!isLoading} timeout={500}>
      <article className='watchlists'>
        <div className='profile__section-name-wrapper'>
          <Typography sx={{ fontSize: "30px", fontWeight: "600", color: "#fff", fontFamily: "Inter" }}>
            Watchlists
          </Typography>
          <WatchlistsControlsView listViewHandler={listViewHandler} listView={listView} cellsView={false} />
        </div>

        {userWatchlists && userWatchlists.length !== 0 ? (
          renderLists()
        ) : (
          <Typography level='h3' sx={{ color: "white", mt: "2rem", textAlign: "center" }}>
            Your lists will appear here.
          </Typography>
        )}
        <WatchlistsControlsAdd handleWatchlistNew={handleWatchlistNew} />
      </article>
    </Fade>
  );
};

export default Watchlists;
