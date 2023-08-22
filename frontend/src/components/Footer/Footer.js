import { useEffect, useState } from "react";

const Footer = (props) => {
  const { onHomePage, showMov, isLoadingMovieData } = props;
  const [footerHome, setfooterHome] = useState("footer__home");

  useEffect(() => {
    if ((!onHomePage || showMov) && !isLoadingMovieData) {
      setTimeout(() => setfooterHome(""), 200);
    }
    if (onHomePage || isLoadingMovieData) {
      setfooterHome("footer__home");
    }
  }, [onHomePage, showMov, isLoadingMovieData]);

  return (
    <footer className={`footer ${footerHome}`}>
      <article className='footer__contact'></article>
      <h4 className='footer__copyright'>© {new Date().getFullYear()} by Andrey Rybakov</h4>
    </footer>
  );
};

export default Footer;
