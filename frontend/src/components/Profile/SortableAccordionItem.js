import { useEffect } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { WhiteDragHandleIcon } from "../Utility/StyledComponents/StyledComponentsUtility";

const SortableAccordionItem = ({ id, expandedAccordions, nodeRef, children }) => {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id,
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
    <li className='watchlist-accordion item' ref={nodeRef} style={style}>
      <WhiteDragHandleIcon
        sx={{
          cursor: "grab",
          opacity: expandedAccordions ? 1 : 0,
          transform: expandedAccordions ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 300ms, transform 300ms",
          touchAction: "manipulation",
        }}
        {...listeners}
        {...attributes}
      />

      {children}
    </li>
  );
};

export default SortableAccordionItem;
