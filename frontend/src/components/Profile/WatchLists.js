import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/joy";
import { Clear, CropSquare, ExpandMore, List } from "@mui/icons-material";
import { Accordion, ButtonGroup, Fade, Tooltip } from "@mui/material";
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

import WatchlistsControlsNew from "./WatchlistsControlsNew";
import WatchlistsControlsEdit from "./WatchlistsControlsEdit";
import SortableAccordionItem from "./SortableAccordionItem";
import SortableTitleItem from "./SortableTitleItem";
import { deleteWatchlist, patchWatchlist, postWatchlist, updateUser } from "../../services/CrudService";

import { useWatchlistContext } from "../../hooks/useWatchlistContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  StyledAccordionDetailsWatchlist,
  StyledAccordionSummaryWatchlist,
  StyledWatchlistName,
  StyledWatchlistNameInput,
  StyledWatchlistTitleRemoveButton,
  StyledWatchlistTitleText,
} from "../Utility/StyledComponents/StyledComponentsProfile";
import { StyledButton, WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";

const WatchLists = ({ props, userWatchlists, user }) => {
  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [editList, setEditList] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [listName, setListName] = useState("");
  const [listCopy, setListCopy] = useState({});
  const [listView, setListView] = useState("icon");

  const { isLoading, dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();

  console.log(userWatchlists);

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
    if (id === "listViewIconBtn") setListView("icon");
    if (id === "listViewDetailsBtn") setListView("details");
  };

  const handleDeleteDialog = (listID) => {
    setOpenDialog(listID ? listID : false);
  };

  const handleDialogConfirm = (listID) => {
    setOpenDialog(false);
    deleteWatchlist(user.token, listID, dispatchWatchlists, dispatchUser);
    if (expandedAccordions.includes(listID)) {
      setTimeout(() => {
        setExpandedAccordions(expandedAccordions.filter((a) => a !== listID));
      }, 300);
    }
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
    let selectedList = listCopy;
    dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: selectedList });
    setEditList("");
  };

  const handleWatchlistSave = (listID) => {
    let selectedList = findListById(listID);
    const update = { name: listName, titles: selectedList.titles };
    patchWatchlist(user.token, listID, update, dispatchWatchlists, dispatchUser);
    setEditList("");
  };

  const handleWatchlistNew = (e) => {
    postWatchlist(user.token, user.id, dispatchWatchlists, dispatchUser);
  };

  const handletTitleDndEnd = (e) => {
    const { active, over } = e;
    if (!over) return;
    const target = active.id;
    const targetListID = active.data.current.listID;
    const startPosition = active.data.current.sortable.index;

    let selectedList = findListById(targetListID);
    const title = selectedList.titles.find((t) => t.imdbID === target);

    if (target !== over.id) {
      let endPosition;
      endPosition = selectedList.titles.findIndex((t) => t.imdbID === over.id);

      selectedList.titles.splice(startPosition, 1);
      selectedList.titles.splice(endPosition, 0, title);

      dispatchWatchlists({ type: "PATCH_WATCHLIST", payload: selectedList });
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
      updateUser(user.token, user.id, { watchlistOrder: watchlistsCopy.map((w) => w._id) }, dispatchUser);
    }
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
          <div
            className={
              listView === "icon"
                ? "watchlist-accordion__entry-img-cont-icon"
                : "watchlist-accordion__entry-img-cont-details"
            }
          >
            <img src={el.poster} alt='Watchlist entry poster' />
          </div>
          <StyledWatchlistTitleText>
            {el.title} <br /> {el.year}
          </StyledWatchlistTitleText>
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
                    listEdit={listEdit}
                    nodeRef={nodeRef}
                  >
                    <div className='watchlist-accordion__entry'>
                      <Link
                        to='/'
                        className={listEdit ? "link-no-hover" : ""}
                        onClick={(e) => {
                          listEdit && e.preventDefault();
                        }}
                      >
                        {titleContent(el)}
                      </Link>

                      {listEdit && (
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

  const renderAccordion = (l) => {
    const selectedForEdit = editList.includes(l._id);
    return (
      <Accordion
        onChange={handleAccordionEdit}
        sx={{
          width: "95%",
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
            <StyledWatchlistNameInput
              id='watchlistNameInput'
              variant='outline'
              defaultValue={l.name}
              onClick={(e) => e.stopPropagation()}
              onChange={handleWatchlistNameInput}
            />
          ) : (
            <Box sx={{ height: "40px", display: "flex", alignItems: "center" }}>
              <StyledWatchlistName>{l.name}</StyledWatchlistName>
            </Box>
          )}
        </StyledAccordionSummaryWatchlist>
        <StyledAccordionDetailsWatchlist className='watchlist-accordion__details'>
          {l.titles.length === 0 ? (
            <Typography sx={{ color: "white" }}>No titles yet </Typography>
          ) : (
            <ol className='watchlist-accordion__titles'>{renderTitles(l, selectedForEdit ? true : false)}</ol>
          )}
          <WatchlistsControlsEdit
            expandedAccordions={expandedAccordions}
            editList={editList}
            handleDeleteDialog={handleDeleteDialog}
            handleDialogConfirm={handleDialogConfirm}
            handleWatchlistEdit={handleWatchlistEdit}
            handleWatchlistCancel={handleWatchlistCancel}
            handleWatchlistSave={handleWatchlistSave}
            listID={l._id}
            openDialog={openDialog}
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
          <Typography sx={{ fontSize: "30px", fontWeight: "800", color: "#fff", fontFamily: "Roboto" }}>
            Watchlists
          </Typography>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='List view settings'>
            <ButtonGroup sx={{ ml: "2rem", height: "35px" }}>
              <StyledButton
                id='listViewIconBtn'
                onClick={listViewHandler}
                sx={{ width: "10px", backgroundColor: `${listView === "icon" && "#222222"}` }}
              >
                <CropSquare />
              </StyledButton>
              <StyledButton
                id='listViewDetailsBtn'
                onClick={listViewHandler}
                sx={{ width: "10px", backgroundColor: `${listView === "details" && "#222222"}` }}
              >
                <List />
              </StyledButton>
            </ButtonGroup>
          </Tooltip>
        </div>

        {userWatchlists && userWatchlists.length !== 0 ? (
          renderLists()
        ) : (
          <Typography level='h3' sx={{ color: "white", mt: "2rem", textAlign: "center" }}>
            Your lists will appear here.
          </Typography>
        )}
        <WatchlistsControlsNew handleWatchlistNew={handleWatchlistNew} />
      </article>
    </Fade>
  );
};

export default WatchLists;
