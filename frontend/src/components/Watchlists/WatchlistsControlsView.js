import React from "react";

import { ButtonGroup, Fade, Tooltip } from "@mui/material";
import { AppsOutlined, CropSquare, List } from "@mui/icons-material";

import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";

const WatchlistsControlsView = ({ listViewHandler, listView, cellsView }) => {
  return (
    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='List view settings'>
      <ButtonGroup>
        <StyledButton
          id='listViewLargeBtn'
          onClick={listViewHandler}
          sx={{
            width: "10px",
            backgroundColor: `${listView === "large" && "#f8f9f9"}`,
            color: listView === "large" ? "#000000" : "#fffff",
          }}
        >
          <CropSquare />
        </StyledButton>
        <StyledButton
          id='listViewSmallBtn'
          onClick={listViewHandler}
          sx={{
            width: "10px",
            backgroundColor: `${listView === "small" && "#f8f9f9"}`,
            color: listView === "small" ? "#000000" : "#fffff",
          }}
        >
          <List />
        </StyledButton>
        {cellsView && (
          <StyledButton
            id='listViewCellsBtn'
            onClick={listViewHandler}
            sx={{
              width: "10px",
              backgroundColor: `${listView === "cells" && "#f8f9f9"}`,
              color: listView === "cells" ? "#000000" : "#fffff",
            }}
          >
            <AppsOutlined />
          </StyledButton>
        )}
      </ButtonGroup>
    </Tooltip>
  );
};

export default WatchlistsControlsView;
