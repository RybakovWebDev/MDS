import { useEffect } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Divider } from "@mui/material";
import { WhiteDragHandleIcon } from "../Utility/StyledComponents/StyledComponentsUtility";

// const animateLayoutChanges = (args) => (args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true);

const SortableTitleItem = ({ id, listID, listEdit, nodeRef, children }) => {
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
          <WhiteDragHandleIcon
            sx={{
              cursor: "grab",
              pointerEvents: listEdit ? "all" : "none",
              opacity: listEdit ? 1 : 0,
              transform: listEdit ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 300ms, transform 300ms",
              touchAction: "manipulation",
            }}
            {...listeners}
            {...attributes}
          />

          {children}
        </Box>
        <Divider sx={{ m: "0.5rem 0 0.5rem 0", backgroundColor: "#595959" }} />
      </Box>
    </li>
  );
};

export default SortableTitleItem;
