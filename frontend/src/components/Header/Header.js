import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Fade, Link, Tooltip, Typography } from "@mui/material";

import HeaderMenu from "./HeaderMenu";
import AuthDialog from "./AuthDialog";
import { StyledHeaderButton, StyledHeaderFormControlLabel } from "../Utility/StyledComponents/StyledComponentsHeader";
import { StyledSwitch, WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";
import { AuthContext } from "../../context/AuthContext";

const Header = ({
  onHomePage,
  user,
  logout,
  clearMovData,
  inputMode,
  handleModeSwitch,
  searchTop,
  isLoadingMovieData,
}) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authSwitch, setAuthSwitch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modeSwitchDisable, setModeSwitchDisable] = useState(false);

  const { isLoading } = useContext(AuthContext);

  const authDialogHandler = () => {
    setAuthOpen(!authOpen);
    setAuthSwitch(false);
  };

  const menuStateHandler = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleHandler = () => {
    handleModeSwitch();
    setModeSwitchDisable(true);
    setTimeout(() => {
      setModeSwitchDisable(false);
    }, 700);
  };

  return (
    <header className={`header${!searchTop && onHomePage ? " fixed" : ""}`}>
      <div className='header__wrapper'>
        <div className='header__group'>
          <nav aria-label='Main navigation'>
            <div
              className={`header__item ${isLoadingMovieData ? "disabled" : ""}`}
              onClick={() => {
                clearMovData();
              }}
            >
              <Link
                underline='none'
                variant='h5'
                color='white'
                component={RouterLink}
                to='/'
                className='header__link'
                sx={{ fontFamily: "Montserrat" }}
              >
                MDS
              </Link>
            </div>
          </nav>
          {!searchTop && onHomePage && (
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title='Switch between search and AI chat'
            >
              <StyledHeaderFormControlLabel
                control={<StyledSwitch color='primary' />}
                disabled={modeSwitchDisable}
                label={
                  <>
                    <Fade in={inputMode === "search"}>
                      <Typography sx={{ lineHeight: 0 }}>Search mode</Typography>
                    </Fade>
                    <Fade in={inputMode === "AI"}>
                      <Typography sx={{ lineHeight: 0 }}>AI mode</Typography>
                    </Fade>
                  </>
                }
                onChange={toggleHandler}
              />
            </Tooltip>
          )}
        </div>
        <div className='header__item'>
          {user ? (
            <HeaderMenu
              open={menuOpen}
              setMenuOpen={setMenuOpen}
              menuStateHandler={menuStateHandler}
              logout={logout}
              setAuthOpen={setAuthOpen}
              setAuthSwitch={setAuthSwitch}
            />
          ) : isLoading ? (
            <WhiteSpinner />
          ) : (
            <div>
              <StyledHeaderButton disableRipple onClick={authDialogHandler}>
                <Typography variant='h5'>Sign in</Typography>
              </StyledHeaderButton>
              <AuthDialog
                open={authOpen}
                authDialogHandler={authDialogHandler}
                authSwitch={authSwitch}
                setAuthSwitch={setAuthSwitch}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
