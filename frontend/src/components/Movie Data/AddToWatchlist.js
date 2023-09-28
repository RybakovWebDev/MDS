import { Add, CheckCircle, CircleOutlined, Clear } from "@mui/icons-material";
import { Button, List, ListItem, ListItemButton } from "@mui/joy";
import React, { useState } from "react";
import { DialogContent, DialogTitle, ListItemText, Typography } from "@mui/material";

import { useWatchlistContext } from "../../hooks/useWatchlistContext";
import { patchWatchlist, postWatchlist } from "../../services/CrudService";
import {
  FadeIcon,
  StyledButtonSmall,
  StyledDialog,
  WhiteAddIcon,
} from "../Utility/StyledComponents/StyledComponentsUtility";
import { useAuthContext } from "../../hooks/useAuthContext";
import { StyledAddToWatchlistListItemText } from "../Utility/StyledComponents/StyledComponentsWatchlist";

const ListSelectDialog = ({ user, open, handleListDialog, userWatchlists, titleDataTMDB, titlePosterOMDB }) => {
  const { dispatchWatchlists } = useWatchlistContext();
  const { dispatchUser } = useAuthContext();

  const titleToAdd = {
    imdbID: titleDataTMDB?.imdb_id,
    title: titleDataTMDB?.title,
    year: titleDataTMDB?.release_date.substring(0, 4),
    poster: titlePosterOMDB,
  };

  const handleListItem = (e, value) => {
    const selectedWatchlist = userWatchlists.find((l) => l._id === value);
    try {
      const update = {
        titles: selectedWatchlist.titles.some((el) => el.imdbID === titleDataTMDB.imdb_id)
          ? [...selectedWatchlist.titles.filter((t) => t.imdbID !== titleDataTMDB.imdb_id)]
          : [...selectedWatchlist.titles, titleToAdd],
      };
      patchWatchlist(user.token, value, update, dispatchWatchlists, dispatchUser);
    } catch (err) {
      console.error("Can't add new title to the watchlist. Error.", err);
    }
  };

  const handleListItemNew = async (e, value) => {
    const update = { titles: [titleToAdd] };
    const newList = await postWatchlist(user.token, user.id, dispatchWatchlists, dispatchUser);
    patchWatchlist(user.token, newList._id, update, dispatchWatchlists, dispatchUser);
  };

  return (
    <StyledDialog onClose={handleListDialog} open={open} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>Where do you want to add this movie?</Typography>
        <StyledButtonSmall variant='outlined' onClick={handleListDialog} sx={{ maxHeight: "2rem" }}>
          <Clear />
        </StyledButtonSmall>
      </DialogTitle>
      <DialogContent dividers>
        <List
          sx={{
            "& .MuiListItemButton-root:hover": {
              bgcolor: "#333333",
            },
          }}
        >
          {userWatchlists &&
            userWatchlists.map((list) => {
              const isInList = list.titles.some((el) => el.imdbID === titleDataTMDB.imdb_id);
              return (
                <ListItem
                  key={list._id}
                  sx={{ margin: "0", padding: "1rem 0.5rem 1rem 0.5rem", borderBottom: "1px solid #333333" }}
                >
                  <ListItemButton
                    selected={true}
                    onClick={(e) => handleListItem(e, list._id)}
                    sx={{ minHeight: "3rem" }}
                  >
                    <StyledAddToWatchlistListItemText primary={list.name} />
                    <div className='add-watchlist__icon-wrapper'>
                      <FadeIcon component={CircleOutlined} visible={!isInList} />
                      <FadeIcon component={CheckCircle} visible={isInList} />
                    </div>
                  </ListItemButton>
                </ListItem>
              );
            })}
          <ListItem>
            <ListItemButton onClick={handleListItemNew}>
              <div className='add-watchlist__icon-wrapper'>
                <WhiteAddIcon />
              </div>
              <ListItemText primary='Create new list' sx={{ marginLeft: "1rem", color: "#fff" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </DialogContent>
    </StyledDialog>
  );
};

const AddToWatchlist = (propsAddToWatchlist) => {
  const { user, userWatchlists, titleDataTMDB, titlePosterOMDB } = propsAddToWatchlist;
  const [openDialog, setOpenDialog] = useState(false);

  const handleListDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <div className='add-watchlist fade-in'>
      <Button
        type='button'
        color='neutral'
        variant='outlined'
        sx={{ m: "0 1rem 0 0", padding: "0 0.5rem 0 0.5rem", color: "white" }}
        onClick={handleListDialog}
      >
        <Add />
        Add to list
      </Button>
      <ListSelectDialog
        user={user}
        open={openDialog}
        handleListDialog={handleListDialog}
        userWatchlists={userWatchlists}
        titleDataTMDB={titleDataTMDB}
        titlePosterOMDB={titlePosterOMDB}
      />
    </div>
  );
};

export default AddToWatchlist;
