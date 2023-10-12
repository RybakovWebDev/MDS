import { useEffect, useState } from "react";

import { Fade } from "@mui/material";

import Chatbot from "./Chatbot";
import Search from "./Search";

const HomeInput = ({ TMDBConfigData, searchTop, getMovieData, searchMov, inputMode, isTabletOrMobile }) => {
  const [animateParent, setAnimateParent] = useState(false);
  const [fadeAI, setFadeAI] = useState(false);
  const [fadeSearch, setFadeSearch] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleInputFocus = () => {
    if (!searchInput) setInputFocused(!inputFocused);
  };

  const handleParentTransition = () => {
    if (inputMode === "AI") {
      setAnimateParent(true);
      setFadeSearch(false);
      setTimeout(() => {
        setFadeAI(true);
        setShowChatbot(true);
      }, 500);
    } else {
      setFadeAI(false);
      setTimeout(() => {
        setShowChatbot(false);
        setAnimateParent(false);
        setFadeSearch(true);
      }, 500);
    }
  };

  useEffect(() => {
    handleParentTransition();
  });

  return (
    <section
      className={`home-input${searchTop ? "--up" : ""}${animateParent ? " ai-mode" : ""}${
        inputFocused ? " home-input--active" : ""
      }`}
    >
      <Fade in={true}>
        <article className={`home-input__main-name${inputMode === "AI" ? "--ai" : ""}${searchTop ? "--up" : ""}`}>
          <h1>Welcome to {isTabletOrMobile && <br />}Movie Data Search!</h1>
        </article>
      </Fade>
      {showChatbot ? (
        <Fade in={fadeAI} timeout={500}>
          <article className='home-input__ai'>
            <Chatbot />
          </article>
        </Fade>
      ) : (
        <Fade in={fadeSearch} timeout={500}>
          <article className={`home-input__search${searchTop ? "--up" : ""}`}>
            <Search
              TMDBConfigData={TMDBConfigData}
              getMovieData={getMovieData}
              searchMov={searchMov}
              inputMode={inputMode}
              handleInputFocus={handleInputFocus}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              isTabletOrMobile={isTabletOrMobile}
            />
          </article>
        </Fade>
      )}
    </section>
  );
};

export default HomeInput;
