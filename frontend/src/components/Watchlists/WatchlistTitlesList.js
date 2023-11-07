import { createRef } from "react";

import { Link } from "react-router-dom";
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
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Clear } from "@mui/icons-material";

import SortableTitleItem from "./SortableTitleItem";
import WatchlistTitleContent from "./WatchlistTitleContent";
import { StyledWatchlistTitleRemoveButton } from "../Utility/StyledComponents/StyledComponentsWatchlist";
import { useWatchlistContext } from "../../hooks/useWatchlistContext";

const WatchlistTitlesList = ({
  editList,
  listView,
  isTabletOrMobile,
  handleWatchlistTitleRemove,
  currentWatchlist,
  getMovieData,
}) => {
  const { dispatchWatchlists } = useWatchlistContext();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      <SortableContext items={currentWatchlist.titles.map((t) => t.imdbID)} strategy={verticalListSortingStrategy}>
        <TransitionGroup component={null}>
          {currentWatchlist.titles.map((el) => {
            const nodeRef = createRef();
            return (
              <CSSTransition key={el.imdbID} timeout={300} classNames='item' nodeRef={nodeRef}>
                <SortableTitleItem
                  key={el.imdbID}
                  id={el.imdbID}
                  listID={currentWatchlist._id}
                  editList={editList}
                  nodeRef={nodeRef}
                  isTabletOrMobile={isTabletOrMobile}
                  listViewCells={listView === "cells"}
                >
                  <div className='watchlist-accordion__entry'>
                    <Link
                      to='/'
                      className={`${editList ? "link-no-hover" : ""}${
                        listView === "cells" && !editList ? "link-no-hover-cells" : ""
                      }`}
                      onClick={(e) => {
                        editList && e.preventDefault();
                      }}
                    >
                      <WatchlistTitleContent getMovieData={getMovieData} el={el} listView={listView} />
                    </Link>

                    {editList && (
                      <StyledWatchlistTitleRemoveButton
                        className='fade-in'
                        id='watchlistTitleRemoveBtn'
                        onClick={() => handleWatchlistTitleRemove(currentWatchlist._id, el.imdbID)}
                        sx={{ margin: `${isTabletOrMobile ? "0 0.5rem 0 0.5rem" : "0"}` }}
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
export default WatchlistTitlesList;
