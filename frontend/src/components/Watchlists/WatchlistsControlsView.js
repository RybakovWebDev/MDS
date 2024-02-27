import React from "react";

import { ButtonGroup, Fade, Tooltip } from "@mui/material";
import { AppsOutlined, CropSquare, List } from "@mui/icons-material";

import { StyledButton } from "../Utility/StyledComponents/StyledComponentsUtility";

const WatchlistsControlsView = ({ visible, listViewHandler, listView, cellsView, editList, isTabletOrMobile }) => {
  return (
    <Fade in={visible} timeout={300}>
      <Tooltip title='List view settings'>
        <ButtonGroup sx={{ margin: `${isTabletOrMobile ? "0 1rem 0 0" : "0"}` }}>
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
          {cellsView && !editList && (
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
    </Fade>
  );
};

export default WatchlistsControlsView;
