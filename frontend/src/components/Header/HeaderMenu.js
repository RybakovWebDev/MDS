import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MenuRounded } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { StyledMenuItem } from "../Utility/StyledComponents/StyledComponentsHeader";

const HeaderMenu = ({ open, setMenuOpen, menuStateHandler, logout, setAuthOpen, setAuthSwitch }) => {
  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const navigate = useNavigate();

  const menuHandler = (e) => {
    const target = e.currentTarget;
    const id = target.id;
    setAnchorElMenu(e.currentTarget);
    setMenuOpen(!open);

    if (id === "menuProfileBtn") {
      navigate("/profile");
    }
    if (id === "menuHomeBtn") {
      navigate("/");
    }
    if (id === "menuLogoutBtn") {
      navigate("/");
      logout();
      setAuthOpen(false);
      setAuthSwitch(false);
    }
  };
  return (
    <nav aria-label='User menu navigation'>
      <IconButton
        id='menuBtn'
        aria-controls={open ? "headerMenuBtn" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={menuHandler}
      >
        <MenuRounded
          fontSize='large'
          sx={{
            color: "white",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        />
      </IconButton>
      <Menu
        id='headerMenu'
        anchorEl={anchorElMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={menuStateHandler}
        MenuListProps={{
          "aria-labelledby": "menuItemBtn",
        }}
      >
        <StyledMenuItem id='menuHomeBtn' onClick={menuHandler} sx={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}>
          Home
        </StyledMenuItem>
        <StyledMenuItem id='menuProfileBtn' onClick={menuHandler} sx={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}>
          Profile
        </StyledMenuItem>
        <StyledMenuItem id='menuLogoutBtn' onClick={menuHandler}>
          Logout
        </StyledMenuItem>
      </Menu>
    </nav>
  );
};
export default HeaderMenu;
