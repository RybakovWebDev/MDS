import { useEffect } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Divider } from "@mui/material";
import { WhiteDragHandleIcon } from "../Utility/StyledComponents/StyledComponentsUtility";

// const animateLayoutChanges = (args) => (args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true);

const SortableTitleItem = ({ id, listID, editList, nodeRef, children, listViewCells, isTabletOrMobile, isDragged }) => {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    // animateLayoutChanges,
    id,
    data: {
      listID: listID,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  useEffect(() => {
    if (nodeRef.current) {
      setNodeRef(nodeRef.current);
    }
  }, [nodeRef, setNodeRef]);

  return (
    <li ref={nodeRef} className={"item"} style={style}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!listViewCells && (
            <WhiteDragHandleIcon
              sx={{
                margin: `${isTabletOrMobile ? "0 0.5rem 0 0.5rem" : "0"}`,
                cursor: "grab",
                pointerEvents: editList ? "all" : "none",
                opacity: editList ? 1 : 0,
                transform: editList ? "translateX(0)" : "translateX(-30px)",
                transition: "opacity 300ms, transform 300ms",
                touchAction: "none",
              }}
              {...listeners}
              {...attributes}
            />
          )}
          {children}
        </Box>
        {!listViewCells && (
          <Divider sx={{ m: "0.5rem 0 0.5rem 0", backgroundColor: "#595959", opacity: isDragged ? 0 : 1 }} />
        )}
      </Box>
    </li>
  );
};

export default SortableTitleItem;
